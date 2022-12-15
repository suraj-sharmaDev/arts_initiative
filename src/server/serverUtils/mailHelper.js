var nodemailer = require("nodemailer");
import { mailId, mailPassword } from "src/server/serverConfig/serverConstants";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailId,
    pass: mailPassword,
  },
});

class MailHelper {
  constructor(toMail, subject, text, html) {
    this.mailOptions = {
      from: mailId,
      to: toMail,
      subject: subject,
      ...(text && { text }),
      ...(html && { html }),
    };
  }

  async sendMail() {
    return new Promise((resolve, reject) => {
      transporter.sendMail(this.mailOptions, function (error, info) {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(info.response);
        }
      });
    });
  }
}

export default MailHelper;