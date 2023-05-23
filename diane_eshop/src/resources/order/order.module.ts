import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SendGridModule } from 'src/sendgrid/sendgrid.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [PrismaModule, SendGridModule],
})
export class OrderModule {}
