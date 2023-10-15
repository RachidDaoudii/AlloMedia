const nodemailer = require("nodemailer");

class Mailer {
  static template = (name, email, tekon) => {
    return `
        <h1>Hi, ${name}</h1>
        <p>Thank you for registering on our site.</p>
        <p>Click the link below to activate your account</p>
        <a href="http://localhost:3000/api/auth/activationEmail/${email}/${tekon}">Activate</a>
   `;
  };

  static sendEmail = async (name, to, tekon) => {
    try {
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "68503c8b2329f3",
          pass: "5b5f7273e11c6c",
        },
      });

      const mailOptions = {
        from: "rachiddaoudi533@gmail.com",
        to: to,
        subject: "Activation Email",
        html: this.template(name, to, tekon),
      };
      const info = await transport.sendMail(mailOptions);
      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = Mailer;
