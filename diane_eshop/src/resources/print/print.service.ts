import { CreateFormatDto } from './../format/dto/create-format.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { CreatePrintDto } from './dto/create-print.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrintService {
  constructor(private prisma: PrismaService) {}

  create(createPrintDto: CreatePrintDto) {
    createPrintDto.documentUrl = `https://images.vanbutselediane.com/${createPrintDto.title.replace(
      /\s/gi,
      '%20',
    )}.jpg`;

    return this.prisma.print.create({
      data: createPrintDto,
    });
  }

  async createFormat(printId: number, createFormatDto: CreateFormatDto) {
    createFormatDto.print_id = printId;

    return this.prisma.format.create({
      data: createFormatDto,
    });
  }

  findAll() {
    return this.prisma.print.findMany({
      select: {
        id: true,
        title: true,
        documentUrl: true,
        formats: true,
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
