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

@Module({
  imports: [
    PrismaModule,
    PrintModule,
    OrderModule,
    AuthModule,
    SendGridModule,
    FormatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
