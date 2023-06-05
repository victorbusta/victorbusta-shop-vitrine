import { ApiProperty } from '@nestjs/swagger';

export class CreatePrintDto {
  @ApiProperty()
  title: string;

  documentUrl: string;
}
