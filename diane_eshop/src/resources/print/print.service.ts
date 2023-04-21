import { CreateFormatDto } from './../format/dto/create-format.dto';
import { Injectable } from '@nestjs/common';
import { CreatePrintDto } from './dto/create-print.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrintService {
  constructor(private prisma: PrismaService) {}

  create(createPrintDto: CreatePrintDto) {
    return this.prisma.print.create({ data: createPrintDto });
  }

  createDocument(printId: number, file: Express.Multer.File) {
    return this.prisma.document.create({
      data: {
        print_id: printId,
        name: file.originalname,
        mimetype: file.mimetype,
        buffer: file.buffer,
        size: file.size,
      },
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
        creation_date: true,
        document: true,
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
            orders: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    this.prisma.document.delete({ where: { print_id: id } });
    this.prisma.format.deleteMany({ where: { print_id: id } });
    return this.prisma.print.delete({ where: { id: id } });
  }
}
