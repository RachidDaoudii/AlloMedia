const nodemailer = require("nodemailer");
require("dotenv").config();

class Mailer {
  static transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  static template = (name, email, token, _subject) => {
    if (_subject == "Activation Email") {
      return `
        <h1>Hi, ${name}</h1>
        <p>Thank you for registering on our site.</p>
        <p>Click the link below to activate your account</p>
        <a href="http://localhost:5000/api/auth/activationEmail/${email}/${token}">Activate</a>
        `;
    } else {
      return `<h1>Bonjour ${name}</h1>
        <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet e-mail ou nous contacter pour nous le signaler. Votre compte est en sécurité.</p>
        
        <a href="http://localhost:5173/restPassword/?token=${token}">Reset Password</a>

        `;
    }
  };

  static sendEmail = async (name, to, token, _subject) => {
    try {
      const mailOptions = {
        from: "rachiddaoudi533@gmail.com",
        to: to,
        subject: _subject,
        html: this.template(name, to, token, _subject),
      };
      const info = await this.transport.sendMail(mailOptions);
      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = Mailer;
