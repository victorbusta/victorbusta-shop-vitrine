import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  Post,
  Response,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/public.decorator';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Get(':id/verify')
  verify(@Param('id') id: number, @Query('token') token: string) {
    return this.orderService.verify(+id, token);
  }

  @Public()
  @Get(':id/shipping')
  shipping(@Param('id') id: number, @Query('token') token: string) {
    return this.orderService.shipping(+id, token);
  }

  @Public()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get('unship')
  findUnship() {
    return this.orderService.findUnship();
  }

  @ApiBearerAuth('JWT-auth')
  @Get('shipping')
  findShipping() {
    return this.orderService.findShipping();
  }

  @ApiBearerAuth('JWT-auth')
  @Get('shipped')
  findShipped() {
    return this.orderService.findShipped();
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }
}
