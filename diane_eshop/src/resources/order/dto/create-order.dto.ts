import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class CreateOrderDto {
  @ApiProperty()
  customer_firstname: string;

  @ApiProperty()
  customer_lastname: string;

  @ApiProperty()
  @IsEmail()
  customer_email: string;

  @ApiProperty()
  shipping_adress: string;

  @ApiProperty()
  shipping_postalcode: string;

  @ApiProperty()
  shipping_city: string;

  shipping: boolean;
  shipped: boolean;

  validation_token: string;

  print_id: number;
  format_id: number;
}
