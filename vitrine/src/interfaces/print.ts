export interface Format {
  id: number;
  print_id: number;
  label: string;
  price: number;
  price_frame: number;
  size: string;
  size_frame: string;
}

export interface Print {
  id: number;
  creation_date: Date;
  title: string;
  documentUrl: string;
  description: string;
  current_number: number;
  initial_number: number;
  formats: Format[];
}

export interface OrderFormat {
  format: Format;
  qty: number;
  with_frame: boolean;
}

export interface Order {
  formats: OrderFormat[];
}
