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

  static template = (name, email, tekon, _subject) => {
    if (_subject == "Activation Email") {
      return `
        <h1>Hi, ${name}</h1>
        <p>Thank you for registering on our site.</p>
        <p>Click the link below to activate your account</p>
        <a href="http://localhost:3000/api/auth/activationEmail/${email}/${tekon}">Activate</a>
        `;
    } else {
      return `<h1>Bonjour ${name}</h1>
        <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet e-mail ou nous contacter pour nous le signaler. Votre compte est en sécurité.</p>
        <p>Voici votre code de réinitialisation de mot de passe : ${tekon}</p>
        `;
    }
  };

  static sendEmail = async (name, to, tekon, _subject) => {
    try {
      const mailOptions = {
        from: "rachiddaoudi533@gmail.com",
        to: to,
        subject: _subject,
        html: this.template(name, to, tekon, _subject),
      };
      const info = await this.transport.sendMail(mailOptions);
      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      return error;
    }
  };
}

module.exports = Mailer;
