import { Module } from '@nestjs/common';
import { PrintService } from './print.service';
import { PrintController } from './print.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PrintController],
  providers: [PrintService],
  imports: [PrismaModule],
})
export class PrintModule {}
