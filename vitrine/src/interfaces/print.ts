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
  loaded: boolean; // Add the loaded property to the Print interface
}

export interface CheckoutPrint {
  id: number;
  title: string;
  documentUrl: string;
  format: Format;
}
