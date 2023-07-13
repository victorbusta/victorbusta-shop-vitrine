import { ApiProperty } from '@nestjs/swagger';

class FormatDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  with_frame: boolean;
}

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

  @ApiProperty({
    type: FormatDto,
    isArray: true,
  })
  formats?: FormatDto[];

  shipping: boolean;
  shipped: boolean;

  validation_token: string;
}
