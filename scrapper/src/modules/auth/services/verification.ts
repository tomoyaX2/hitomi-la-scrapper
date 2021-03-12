import nodemailer from "nodemailer";
import { dbAuthService } from ".";

const account = {
  user: "kalinichenko1999@gmail.com",
  pass: "okadzakitomoyalovesfurukawanagisaX1",
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: account.user,
    pass: account.pass,
  },
});

class VerificationService {
  generateTemplate = (userId, code) => {
    return `<html><body> <span>Please, move to http://localhost:3000/verification?&userId=${userId} and enter this code: <b>${code}</b> into the form</span></body></html>`;
  };

  sendEmail = async ({ to, subject, html }) => {
    let info = await transporter.sendMail({
      from: "kalinichenko1999@gmail.com",
      to,
      subject,
      html,
    });
    return info;
  };

  initVeririfcation = async (email, userId) => {
    const code = (Math.random() * 100000).toFixed();
    await dbAuthService.updateUserWithCode(userId, code);
    await this.sendEmail({
      to: email,
      subject: "Verification code",
      html: this.generateTemplate(userId, code),
    });
  };
}

export { VerificationService };
