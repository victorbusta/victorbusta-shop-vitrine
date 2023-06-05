export class Order {
  id: number;
  order_date: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  shipping_adress: string;
  shipping_postalcode: string;
  shipping_city: string;
  shipping: boolean;
  shipped: boolean;
  validation_token?: string;
}
