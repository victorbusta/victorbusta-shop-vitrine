export interface Format {
  id: number;
  print_id: number;
  label: string;
  price: number;
  size: string;
}

export interface Print {
  id: number;
  creation_date: Date;
  title: string;
  documentUrl: string;
  formats: Format[];
}

export interface CheckoutPrint {
  id: number;
  title: string;
  documentUrl: string;
  format: Format;
}
