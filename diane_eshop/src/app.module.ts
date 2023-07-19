import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrintModule } from './resources/print/print.module';
import { OrderModule } from './resources/order/order.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { SendGridModule } from './sendgrid/sendgrid.module';
import { FormatModule } from './resources/format/format.module';
import { PaypalService } from './paypal/paypal.service';
import { PaypalModule } from './paypal/paypal.module';

@Module({
  imports: [
    PrismaModule,
    PrintModule,
    OrderModule,
    AuthModule,
    SendGridModule,
    FormatModule,
    PaypalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PaypalService,
  ],
})
export class AppModule {}
