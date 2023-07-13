import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validatePassword } from 'bcrypt/password-hasher';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from 'bcrypt/password-hasher';
import { Order } from '@prisma/client';
import { Format } from 'src/resources/format/entities/format.entity';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private sendgrid: SendGridService,
  ) {}

  async shipping(id: number, token: string) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: id },
    });

    if (order.validation_token === null || !order.shipping) {
      throw new HttpException('Order already shipped', 200);
    }

    if (!validatePassword(token, order.validation_token as string)) {
      throw new HttpException('what is the point of hacking this ?', 401);
    }

    order.validation_token = null;

    const formats = await this.prisma.order_Format
      .findMany({
        where: { order_id: order?.id },
        select: {
          format: {
            select: {
              id: true,
              print: true,
              price: true,
              label: true,
              size: true,
            },
          },
        },
      })
      .then((order_formats) =>
        order_formats.map((val) => {
          return { ...val.format };
        }),
      );

    this.sendgrid.sendShipping(order, formats);

    await this.prisma.order.update({
      where: { id: id },
      data: order,
    });

    return '<h1 style="width:100vw;text-align:center;">client prévenu</h1>';
  }

  async verify(id: number, token: string) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: id },
    });

    if (order.validation_token === null) {
      throw new HttpException('Order already validated', 200);
    }

    if (!validatePassword(token, order.validation_token as string)) {
      throw new HttpException('token not valid', 401);
    }

    const formats = await this.prisma.order_Format
      .findMany({
        where: { order_id: order?.id },
        select: {
          format: {
            select: {
              id: true,
              print: true,
              price: true,
              label: true,
              size: true,
              price_frame: true,
              size_frame: true,
            },
          },
          with_frame: true,
        },
      })
      .then((order_formats) =>
        order_formats.map((val) => {
          return { ...val.format, with_frame: val.with_frame };
        }),
      );

    const validationToken = uuidv4();
    order.validation_token = hashPassword(validationToken);
    order.shipping = true;

    this.sendgrid.sendAdmin(order, formats, validationToken);

    await this.prisma.order.update({
      where: { id: id },
      data: order,
    });

    return '<h1 style="width:100vw;text-align:center;">Merci d\'avoir passé commande</h1>';
  }

  async create(createOrderDto: CreateOrderDto) {
    const formats = await Promise.all(
      (createOrderDto.formats ?? []).map(async (_format) => {
        return this.prisma.format
          .findUniqueOrThrow({
            where: { id: _format.id },
            select: {
              id: true,
              price: true,
              price_frame: true,
              size: true,
              size_frame: true,
              label: true,
              print: true,
            },
          })
          .then((format) => {
            if (format.print.current_number <= 0) {
              throw new HttpException('no more prints left', 401);
            }

            return { ...format, with_frame: _format.with_frame };
          });
      }),
    );

    if (formats === undefined) {
      throw new HttpException('no formats given', 401);
    }

    delete createOrderDto.formats;

    const validationToken = uuidv4();

    createOrderDto.shipping = false;
    createOrderDto.shipped = false;
    createOrderDto.validation_token = hashPassword(validationToken);

    const order = await this.prisma.order.create({ data: createOrderDto });

    const relations: {
      order_id: number;
      format_id: number;
      with_frame: boolean;
    }[] = [];

    formats.forEach((format) => {
      relations.push({
        order_id: order.id,
        format_id: format.id,
        with_frame: format.with_frame,
      });
      return;
    });

    await this.prisma.order_Format.createMany({ data: relations });

    await this.sendgrid.sendClient(order, formats, validationToken);

    for (const format of formats) {
      await this.prisma.format
        .findUniqueOrThrow({
          where: { id: format.id },
          select: { print: true },
        })
        .then(async (_format) => {
          await this.prisma.print.update({
            where: { id: _format.print.id },
            data: { current_number: _format.print.current_number - 1 },
          });
        })
        .catch(() => {
          throw new HttpException('an error occured', 500);
        });
    }

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
