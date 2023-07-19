import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SendGridModule } from 'src/sendgrid/sendgrid.module';
import { PaypalModule } from 'src/paypal/paypal.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [PrismaModule, SendGridModule, PaypalModule],
})
export class OrderModule {}
