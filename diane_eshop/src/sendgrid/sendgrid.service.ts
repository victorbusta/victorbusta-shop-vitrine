import { Injectable, Inject } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  constructor(@Inject('SENDGRID_API_KEY') private apiKey: string) {
    sgMail.setApiKey(apiKey);
  }

  async send(to: string, orderId: number, token: string) {
    const msg = {
      to,
      from: 'noreply.vanbutselediane@gmail.com',
      subject: `Cofirmez votre commande n°${orderId}`,
      html: `<p>Click <a href=${process.env.APP_URL}order/${orderId}/verify?token=${token}>here</a> to verify your email address.</p>`,
    };
    return sgMail.send(msg);
  }
}
