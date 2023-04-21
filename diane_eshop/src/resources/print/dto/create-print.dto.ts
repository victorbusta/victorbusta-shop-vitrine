import { ApiProperty } from '@nestjs/swagger';

export class CreatePrintDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  creation_date: string;
}
