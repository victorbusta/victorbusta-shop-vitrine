import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  price: number;

  print_id: number;
}
