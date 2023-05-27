import { ApiProperty } from '@nestjs/swagger';
import { Format } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  customer_firstname: string;

  @ApiProperty()
  customer_lastname: string;

  @ApiProperty()
  // @IsEmail()
  customer_email: string;

  @ApiProperty()
  shipping_adress: string;

  @ApiProperty()
  shipping_postalcode: string;

  @ApiProperty()
  shipping_city: string;

  @ApiProperty()
  formats_id?: number[];

  shipping: boolean;
  shipped: boolean;

  validation_token: string;
}
