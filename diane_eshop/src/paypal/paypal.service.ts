import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class PaypalService {
  constructor() {
    paypal.configure({
      mode: process.env.PAYPAL_MODE as string,
      client_id: process.env.PAYPAL_ID as string,
      client_secret: process.env.PAYPAL_SECRET as string,
    });
  }

  createPayment(order: Order, amount: number, token: string): Promise<any> {
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${process.env.APP_URL}order/${order.id}/verify?veriftoken=${token}`,
        cancel_url: `${process.env.APP_URL}order/${order.id}/payment`,
      },
      transactions: [
        {
          amount: {
            total: amount.toFixed(2),
            currency: process.env.PAYPAL_CURRENCY as string,
          },
          description: 'Payment for order',
          custom: `#${order.id}`,
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          const redirectUrl = payment?.links?.find(
            (link: any) => link.rel === 'approval_url',
          )?.href;
          if (redirectUrl) {
            resolve(redirectUrl);
          } else {
            reject(
              new Error('Approval URL not found in the payment response.'),
            );
          }
        }
      });
    });
  }
}
