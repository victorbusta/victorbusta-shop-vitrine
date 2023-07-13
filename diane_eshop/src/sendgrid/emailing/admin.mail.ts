import { Order, Print } from '@prisma/client';
import { Format } from 'src/resources/format/entities/format.entity';

export const getAdminMail = (
  order: Order,
  formats: any[],
  orderShipedlink: string,
): string => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: arial,helvetica,sans-serif;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4ee600aa-0aad-4317-b5d2-0b712427f5f6" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:40px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h1 style="text-align: center"><span style="font-size: 36px; font-family: &quot;times new roman&quot;, times, serif; color: #737373">💥 Nouvelle Commande n#${
          order.id
        } 🍾 💥</span></h1><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ea2c96b2-616f-454c-9e16-7661b9626fae" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h2 style="text-align: inherit"><span style="font-size: 24px; font-family: &quot;times new roman&quot;, times, serif">💃Client:&nbsp;</span></h2>
<ul>
  <li style="text-align: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; font-size: 18px;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">client:&nbsp;${`${order.customer_firstname} ${order.customer_lastname}`}</span></li>
  <li style="text-align: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; font-size: 18px"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">email:&nbsp;${
    order.customer_email
  }</span></li>
  <li style="text-align: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; font-size: 18px"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">adresse:&nbsp;${
    order.shipping_adress
  }, ${order.shipping_city}, ${order.shipping_postalcode}</span></li>
</ul><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ea2c96b2-616f-454c-9e16-7661b9626fae.2" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h2 style="text-align: inherit"><span style="font-size: 24px; font-family: &quot;times new roman&quot;, times, serif">📜 Prints:</span></h2>
${addPrints(formats)}<div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f8c1e9d0-8cd6-4b3d-b77f-c25086492e41" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h2 style="text-align: inherit">💸 Prix Total:&nbsp;<b>${getTotalPrice(
          formats,
        )}€</b></h2><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="596f2c90-b2d5-4406-a182-2d83d8391d8b">
    <tbody>
      <tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ec62f516-ddbe-4ecc-b2aa-11a9a3038ba7">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
            <tbody>
              <tr>
                <td style="padding:0px 0px 10px 0px;" bgcolor="#000000"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a6cb39d4-89cc-4103-b598-6d54d8df41b6">
    <tbody>
      <tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f71635df-9742-46a2-ae0d-bd6555abaea5">
    <tbody>
      <tr>
        <td height="100%" valign="top" role="module-content"><h3 style="text-align: center; display:flex; justify-content:center;">
    <span style="font-family: times new roman,times,serif">La commande est prête a l'envoi ? click sur <a href="${orderShipedlink}">ce lien</a> pour avertir le client !</span>
</h3></td>
      </tr>
    </tbody>
  </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`;

const addPrints = (formats: any[]): string => {
  const _formats = formats.map(
    (
      format,
    ) => `<li style="text-align: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; font-size: 18px"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">Print n#${
      format.print.id
    }:</span>
        <ul>
          <li style="text-align: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; font-size: 18px"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">url: <b>${
            format.print.documentUrl
          }</b></span></li>
          <li style="text-align: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; font-size: 18px"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">price: <b>${
            format.with_frame ? format.price_frame : format.price
          }€</b></span></li>
          <li style="text-align: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; font-size: 18px"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 18px">format: <b>${
            format.with_frame
              ? format.size_frame + ' (avec cadre)'
              : format.size
          }</b></span></li>
        </ul>
      </li>
      </ul>`,
  );

  return _formats.join('');
};

const getTotalPrice = (formats: any[]): string => {
  let price = 0;

  formats.forEach(
    (format) =>
      (price += format.with_frame ? format.price_frame : format.price),
  );

  return `${price}`;
};
