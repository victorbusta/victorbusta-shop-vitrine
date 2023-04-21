import { CreateOrderDto } from './../order/dto/create-order.dto';
import { CreateFormatDto } from './../format/dto/create-format.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PrintService } from './print.service';
import { CreatePrintDto } from './dto/create-print.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('prints')
@Controller('print')
export class PrintController {
  constructor(private readonly printService: PrintService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createPrintDto: CreatePrintDto) {
    return this.printService.create(createPrintDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Post(':id/document')
  @UseInterceptors(FileInterceptor('file'))
  createDocument(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.printService.createDocument(+id, file);
  }

  @ApiBearerAuth('JWT-auth')
  @Post(':id/format')
  CreateFormat(
    @Param('id') id: number,
    @Body() createFormatDto: CreateFormatDto,
  ) {
    return this.printService.createFormat(+id, createFormatDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.printService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id/order')
  findOrders(@Param('id') id: number) {
    return this.printService.findOrders(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.printService.remove(+id);
  }
}
