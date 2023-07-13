import { CreateFormatDto } from './../format/dto/create-format.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { CreatePrintDto } from './dto/create-print.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrintService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.print.findMany({
      select: {
        id: true,
        title: true,
        documentUrl: true,
        formats: true,
        description: true,
        current_number: true,
        initial_number: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.print.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        documentUrl: true,
        formats: true,
      },
    });
  }

  findOrders(id: number) {
    return this.prisma.print.findUnique({
      where: { id: id },
      select: {
        formats: {
          select: {
            id: true,
            label: true,
            size: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    this.prisma.format.deleteMany({ where: { print_id: id } });
    return this.prisma.print.delete({ where: { id: id } });
  }
}
