import { Print } from '@prisma/client';

export class Format {
  id: number;
  label: string;
  size: string;
  price: number;
  print: Print;
}
