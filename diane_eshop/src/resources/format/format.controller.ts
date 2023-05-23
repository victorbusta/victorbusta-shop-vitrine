import { Controller, Post, Body, Param } from '@nestjs/common';
import { FormatService } from './format.service';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/public.decorator';

@ApiTags('format')
@Controller('format')
export class FormatController {
  constructor(private readonly formatService: FormatService) {}

  // @Public()
  // @Post(':id/order')
  // createOrder(@Param('id') id: number, @Body() createOrderDto: CreateOrderDto) {
  //   return this.formatService.createOrder(+id, createOrderDto);
  // }
}
