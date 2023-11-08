import nodemailer from "nodemailer";
export const emailHtml = (Text) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title></title>
      <!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]-->
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
      <!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
      <!--[if !mso]><!-- -->
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
      <!--<![endif]-->
  </head>
  
  <body>
      <div dir="ltr" class="es-wrapper-color">
          <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                  <v:fill type="tile" src="https://fbodajb.stripocdn.email/content/guids/CABINET_bf3f28777a864b4fca3f15706a2554aa/images/group_10.png" color="#12022f" origin="0.5, 0" position="0.5, 0"></v:fill>
              </v:background>
          <![endif]-->
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" background="https://fbodajb.stripocdn.email/content/guids/CABINET_bf3f28777a864b4fca3f15706a2554aa/images/group_10.png" style="background-position: center top;">
              <tbody>
                  <tr>
                      <td class="esd-email-paddings" valign="top">
                          <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                              <tbody>
                                  <tr>
                                      <td class="esd-stripe es-m-p15r es-m-p15l" align="center" esd-custom-block-id="466831">
                                          <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="640" style="background-color: transparent;">
                                              <tbody>
                                                  <tr>
                                                      <td class="esd-structure es-p30t es-p40r es-p40l" align="left">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr class="es-mobile-hidden">
                                                                                      <td align="center" class="esd-block-spacer" height="15"></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p30t es-p40b es-p40r es-p40l es-m-p20" align="left" bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 20px 20px 0px 0px;" esd-custom-block-id="468138">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" align="left" class="esd-container-frame">
                                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="left" class="esd-block-image" style="font-size: 0px;" height="32"><a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://fbodajb.stripocdn.email/content/guids/CABINET_109b42e969cb8bcd6bf3547022ae0deb/images/logos_2.png" alt style="display: block;" width="230"></a></td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="left" class="esd-block-text es-p30t">
                                                                                          <p><strong>Hi Mike!</strong><br><br>My name is Alisa, I am a representative of the Electros company.<br><br>Recently, we decided to hold a promotion together with our partners, so for you we have prepared offers for electronics with discounts up to 80%.<br><br>We will provide you with a personal consultant who will help you in choosing a product.<br><br><strong>Regards, Alice</strong></p>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="esd-structure es-p40 es-m-p20" align="left" bgcolor="#f9f9f9" style="background-color: #f9f9f9; border-radius: 0px 0px 20px 20px;" esd-custom-block-id="515154">
                                                          <table cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="560" align="left" class="esd-container-frame" esd-custom-block-id="522546">
                                                                          <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f9f9f9" style="background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: #f9f9f9; border-radius: 20px; border-collapse: separate;">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td class="esd-block-html">
                                                                                          <table width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td width="64" valign="top">
                                                                                                          <table>
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email/"><img src="https://fbodajb.stripocdn.email/content/guids/CABINET_109b42e969cb8bcd6bf3547022ae0deb/images/taylorhernandezdlkr_x3t_7sunsplash_3.png" class="p_image" alt="Avatar" width="64" style="display: block; border-radius: 18px;" title="Avatar"></a></td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                      <td width="20"></td>
                                                                                                      <td valign="top">
                                                                                                          <table width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td class="esd-block-text" esd-links-underline="none" esd-links-color="#000000">
                                                                                                                          <h3 class="p_name"><b>Alice</b></h3>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                      <td class="esd-block-text es-p5t" align="left">
                                                                                                                          <h5 style="color: #666666;">Representative of the Electros company</h5>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                      <td align="left" class="esd-block-social es-p10t" style="font-size:0">
                                                                                                                          <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                                              <tbody>
                                                                                                                                  <tr>
                                                                                                                                      <td align="center" valign="top" class="es-p15r"><a target="_blank" href="https://viewstripo.email/"><img title="Facebook" src="https://fbodajb.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="24" height="24"></a></td>
                                                                                                                                      <td align="center" valign="top" class="es-p15r"><a target="_blank" href="https://viewstripo.email/"><img title="Twitter" src="https://fbodajb.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="24" height="24"></a></td>
                                                                                                                                      <td align="center" valign="top" class="es-p15r"><a target="_blank" href="https://viewstripo.email/"><img title="Instagram" src="https://fbodajb.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="24" height="24"></a></td>
                                                                                                                                      <td align="center" valign="top"><a target="_blank" href="https://viewstripo.email/"><img title="Linkedin" src="https://fbodajb.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In" width="24" height="24"></a></td>
                                                                                                                                  </tr>
                                                                                                                              </tbody>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </body>
  
  </html>`
};

export const sendEmail = async function ({
  to,
  cc,
  bcc,
  subject,
  html,
  attachments = [],
} = {}) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.gmail, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });
  console.log(process.env.gmail);
  console.log(process.env.EMAIL_PASSWORD);

  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: `"clinic_reservation🩺💉" <${process.env.gmail}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
