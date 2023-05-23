import { HttpException, Injectable } from '@nestjs/common';
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
}
