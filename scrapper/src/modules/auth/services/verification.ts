import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const account = {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASSWORD,
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
  constructor(public dbAuthService, public secureService) {}
  generateTemplate = (token, code) => {
    return `<html><body> <span>Please, move to ${process.env.SERVER_URL}/verification?token=${token} and enter this code: <b>${code}</b> into the form</span></body></html>`;
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
    try {
      const code = (Math.random() * 100000).toFixed();
      const resendTime = await this.dbAuthService.updateResendState(
        userId,
        code
      );
      const token = this.secureService.generateToken({
        userId,
      });
      await this.sendEmail({
        to: email,
        subject: "Verification code",
        html: this.generateTemplate(token, code),
      });
      return { isSuccess: true, resendTime };
    } catch (e) {
      return { isSuccess: false, errors: e };
    }
  };

  initResendCode = async (email, userId) => {
    try {
      const code = (Math.random() * 100000).toFixed();
      const hashedId = this.secureService.createHash(userId);
      await this.dbAuthService.updateUserWithCode(hashedId, code);
      await this.sendEmail({
        to: email,
        subject: "Verification code",
        html: this.generateTemplate(userId, code),
      });
      return { isSuccess: true };
    } catch (e) {
      return { isSuccess: false, errors: e };
    }
  };

  retryVerification = async (email, userId) => {
    const code = (Math.random() * 100000).toFixed();
    const hashedId = this.secureService.createHash(userId);
    await this.dbAuthService.updateUserWithCode(hashedId, code);
    await this.sendEmail({
      to: email,
      subject: "Verification code",
      html: this.generateTemplate(userId, code),
    });
  };

  sendSms = async (to, code, userId) => {
    const result = client.messages.create({
      body: `Your verififcation code is: ${code}`,
      from: process.env.TWILIO_PHONE,
      to,
    });
    await this.dbAuthService.updateUserWithCode(userId, code);
  };
}

export { VerificationService };
