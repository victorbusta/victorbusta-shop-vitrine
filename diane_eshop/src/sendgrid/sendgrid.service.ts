import { Injectable, Inject } from '@nestjs/common';
import { Order } from '@prisma/client';
import * as sgMail from '@sendgrid/mail';
import { getAdminMail } from './emailing/admin.mail';
import { Format } from 'src/resources/format/entities/format.entity';
import { getVerifyMail } from './emailing/verify.mail';
import { getShippingMail } from './emailing/shipping.mail';

@Injectable()
export class SendGridService {
  constructor(@Inject('SENDGRID_API_KEY') private apiKey: string) {
    sgMail.setApiKey(apiKey);
  }

  async sendClient(order: Order, formats: any[], token: string) {
    const link = `${process.env.APP_URL}order/${order.id}/verify?token=${token}`;

    const msg = {
      to: order.customer_email,
      from: process.env.SENDGRID_EMAIL as string,
      subject: `📸 Confirmation de commande n#${order.id} 📸`,
      html: getVerifyMail(order, formats, link),
    };
    return sgMail.send(msg);
  }

  async sendAdmin(order: Order, formats: any[], token: string) {
    const link = `${process.env.APP_URL}order/${order.id}/shipping?token=${token}`;

    const msg = {
      to: process.env.ADMIN_MAIL,
      from: process.env.SENDGRID_EMAIL as string,
      subject: `💥👀 Nouvelle commande n#${order.id}`,
      html: getAdminMail(order, formats, link),
    };
    return sgMail.send(msg);
  }

  async sendShipping(order: Order, formats: Format[]) {
    const msg = {
      to: order.customer_email,
      from: process.env.SENDGRID_EMAIL as string,
      subject: `📸 Commande n#${order.id} en livraison 🚚`,
      html: getShippingMail(order, formats),
    };
    return sgMail.send(msg);
  }
}
