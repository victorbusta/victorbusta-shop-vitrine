import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validatePassword } from 'bcrypt/password-hasher';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from 'bcrypt/password-hasher';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private sendgrid: SendGridService,
  ) {}

  async verify(id: number, token: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: id },
      select: { validation_token: true },
    });

    if (order?.validation_token === null) {
      throw new HttpException('Order already validated', 200);
    }

    if (!validatePassword(token, order?.validation_token as string)) {
      throw new HttpException('what is the point of hacking this ?', 401);
    }

    return this.prisma.order.update({
      where: { id: id },
      data: { validation_token: null },
    });
  }

  async create(createOrderDto: CreateOrderDto) {
    const validationToken = uuidv4();
    const formats = await this.prisma.format.findMany({
      where: { id: { in: createOrderDto.formats_id } },
    });

    delete createOrderDto.formats_id;

    createOrderDto.shipping = false;
    createOrderDto.shipped = false;
    createOrderDto.validation_token = hashPassword(validationToken);

    const order = await this.prisma.order.create({ data: createOrderDto });

    const relations: { order_id: number; format_id: number }[] = [];
    let price = 0;

    formats.forEach((format) => {
      relations.push({ order_id: order.id, format_id: format.id });
      price += format.price;
    });

    await this.prisma.order_Format.createMany({ data: relations });

    await this.sendgrid.send(
      createOrderDto.customer_email,
      order.id,
      price,
      validationToken,
    );

    return order;
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        order_date: true,
        customer_firstname: true,
        customer_lastname: true,
        shipping_adress: true,
        shipping_postalcode: true,
        shipping_city: true,
        shipping: true,
        shipped: true,
        order_format: true,
      },
    });
  }

  findUnship() {
    return this.prisma.order.findMany({
      where: { shipping: false, shipped: false },
      select: {
        id: true,
        order_date: true,
        customer_firstname: true,
        customer_lastname: true,
        shipping_adress: true,
        shipping_postalcode: true,
        shipping_city: true,
        shipping: true,
        shipped: true,
        order_format: true,
      },
    });
  }

  findShipping() {
    return this.prisma.order.findMany({
      where: { shipping: true, shipped: false },
      select: {
        id: true,
        order_date: true,
        customer_firstname: true,
        customer_lastname: true,
        shipping_adress: true,
        shipping_postalcode: true,
        shipping_city: true,
        shipping: true,
        shipped: true,
        order_format: true,
      },
    });
  }

  findShipped() {
    return this.prisma.order.findMany({
      where: { shipping: true, shipped: true },
      select: {
        id: true,
        order_date: true,
        customer_firstname: true,
        customer_lastname: true,
        shipping_adress: true,
        shipping_postalcode: true,
        shipping_city: true,
        shipping: true,
        shipped: true,
        order_format: true,
      },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id: id },
      data: updateOrderDto,
    });
  }
}
