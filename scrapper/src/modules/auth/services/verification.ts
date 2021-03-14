import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { User } from "../../../../models";

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
      await this.dbAuthService.updateUserWithCode(userId, code);
      const token = this.secureService.generateToken({
        userId,
        isEmail: true,
      });
      await this.sendEmail({
        to: email,
        subject: "Verification code",
        html: this.generateTemplate(token, code),
      });
      return { isSuccess: true };
    } catch (e) {
      return { isSuccess: false, errors: e };
    }
  };

  sendSms = async (to, code, token) => {
    try {
      const result = client.messages.create({
        body: `Your verififcation code is: ${code}. ${
          token
            ? `Please, move by link ${process.env.SERVER_URL}/verification?token=${token} to finish verifying proccess`
            : ""
        }`,
        from: process.env.TWILIO_PHONE,
        to,
      });
      return { isSuccess: true, data: result, errors: null };
    } catch (errors) {
      return { isSuccess: false, data: null, errors };
    }
  };

  initVerifyPhone = async (userId, phone) => {
    try {
      const code = (Math.random() * 100000).toFixed();
      await this.dbAuthService.updateUserWithCode(userId, code);
      const token = this.secureService.generateToken({
        userId,
        isPhone: true,
      });
      await this.dbAuthService.updateUserWithCode(userId, code);
      await this.sendSms(phone, code, token);
      return { isSuccess: true, data: {}, errors: null };
    } catch (errors) {
      return { isSuccess: false, data: null, errors };
    }
  };

  submitPhone = async (code, id) => {
    try {
      const user = await User.findOne({ where: { id } });
      const isSameCode = code === user.code;

      if (!isSameCode) {
        return {
          isSuccess: false,
          data: null,
          errors: { code: "Code is invalid" },
        };
      }
      await this.dbAuthService.updateUserWithCode(id, null);
      await this.dbAuthService.updateUserPhoneState(id, true);
      return { isSuccess: true, data: {}, errors: null };
    } catch (errors) {
      return { isSuccess: false, data: null, errors };
    }
  };
}

export { VerificationService };
