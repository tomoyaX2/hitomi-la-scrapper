import { RegistrationModels, TotalUserFields, UserErrors } from "../types";
import { Credentials, User } from "../../../models";
import uuid from "uuid";
import crypto from "crypto";
import { UserFields } from "../../../models/user";

class DbAuthService {
  constructor() {}

  hashPassword = (password: string) => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
  };

  createToken = () => {
    return crypto.randomBytes(30).toString("hex");
  };

  searchForUserByLogin = async (login: string) => {
    try {
      const result = await Credentials.findOne({
        where: { login },
        include: [User],
      });
      return {
        isSuccess: true,
        data: JSON.parse(JSON.stringify(result)),
        errors: null,
      };
    } catch (errors) {
      return { isSuccess: false, data: null, errors };
    }
  };

  setupToken = async (user_id: string) => {
    const token = this.createToken();
    await User.update({ token }, { where: { id: user_id } });
  };

  searchForExistedLogin = async (login: string) => {
    const isExistsName = await Credentials.findOne({ where: { login } });
    return !!isExistsName;
  };

  searchForExistedEmail = async (email: string) => {
    const isExistsEmail = await User.findOne({ where: { email } });
    return !!isExistsEmail;
  };

  generateUserExistErrorDataForResponse = ({
    isExistsEmail,
    isExistsLogin,
  }) => {
    let errors = {} as UserErrors;
    let isValid = true;
    if (isExistsEmail) {
      isValid = false;
      errors = { ...errors, email: "This email is already taken" };
    }
    if (isExistsLogin) {
      isValid = false;
      errors = { ...errors, login: "This login is already taken" };
    }
    if (isValid) {
      return { errors: null, isSuccess: true };
    }
    return errors;
  };

  searchForExistedCredentials = async (user: TotalUserFields) => {
    const searchLoginResult = this.searchForExistedLogin(user.login);
    const searchEmailResult = this.searchForExistedEmail(user.email);
    const promises = [searchLoginResult, searchEmailResult];
    const result = await Promise.all(promises);
    const isExistsLogin = result[0];
    const isExistsEmail = result[1];
    const errors = this.generateUserExistErrorDataForResponse({
      isExistsEmail,
      isExistsLogin,
    });
    return errors;
  };

  generateUserCredentials = async ({
    modelToUser,
    modelToCredentials,
  }: RegistrationModels) => {
    try {
      const dbUser = await User.create(modelToUser);
      const user = dbUser.toJSON() as UserFields;
      const dbCredentials = await Credentials.create({
        ...modelToCredentials,
        user_id: user.id,
      });
      return { isSuccess: true, errors: null, userId: user.id };
    } catch (errors) {
      return { isSuccess: false, errors, userId: null };
    }
  };

  handleRegistration = async ({
    modelToUser,
    modelToCredentials,
  }: RegistrationModels) => {
    const result = await this.searchForExistedCredentials({
      login: modelToCredentials.login,
      email: modelToUser.email,
    });
    if (result.isSuccess) {
      const result = this.generateUserCredentials({
        modelToUser,
        modelToCredentials,
      });
      return result;
    }
    return result;
  };

  updateUserWithCode = async (userId, code) => {
    await User.update({ code }, { where: { id: userId } });
  };

  initiateUserActivation = async (code, userId) => {
    const user = await User.findOne({ where: { id: userId } });
    const isValidUser = !!user;
    const isValidCode = user.code === code;
    if (isValidUser && isValidCode) {
      await User.update(
        { code: null, isActive: true },
        { where: { id: userId } }
      );
      return { isSuccess: true, errors: null };
    }
    return { isSuccess: false, errors: { isValidCode, isValidUser } };
  };

  handleLogin = async (userData) => {};
}

export { DbAuthService };
