import { Module } from '@nestjs/common';
import { FormatService } from './format.service';
import { FormatController } from './format.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SendGridModule } from 'src/sendgrid/sendgrid.module';

@Module({
  controllers: [FormatController],
  providers: [FormatService],
  imports: [PrismaModule, SendGridModule],
})
export class FormatModule {}
