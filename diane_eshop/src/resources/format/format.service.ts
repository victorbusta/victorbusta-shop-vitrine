import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { hashPassword } from 'bcrypt/password-hasher';
import { v4 as uuidv4 } from 'uuid';
import { SendGridService } from 'src/sendgrid/sendgrid.service';

@Injectable()
export class FormatService {
  constructor(
    private prisma: PrismaService,
    private sendgrid: SendGridService,
  ) {}

  async createOrder(formatId: number, createOrderDto: CreateOrderDto) {
    const validationToken = uuidv4();

    const format = await this.prisma.format.findUniqueOrThrow({
      where: { id: formatId },
      select: { print_id: true },
    });

    createOrderDto.print_id = format?.print_id;
    createOrderDto.format_id = formatId;
    createOrderDto.shipping = false;
    createOrderDto.shipped = false;
    createOrderDto.validation_token = hashPassword(validationToken);

    const order = await this.prisma.order.create({ data: createOrderDto });

    this.sendgrid.send(
      createOrderDto.customer_email,
      order.id,
      validationToken,
    );

    return order;
  }
}
