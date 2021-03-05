import { RegistrationModels, TotalUserFields, UserErrors } from "../types";
import { Credentials, User } from "../../../../models";
import uuid from "uuid";
import crypto from "crypto";
import { UserFields } from "models/user";

class DbAuthService {
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
      const dbUser = await User.create({
        ...modelToUser,
        id: uuid.v4(),
      });
      const user = dbUser.toJSON() as UserFields;
      console.log(user, "user");
      const dbCredentials = await Credentials.create({
        ...modelToCredentials,
        user_id: user.id,
        id: uuid.v4(),
      });
      console.log(dbCredentials.toJSON(), "credentials");
      return { isSuccess: true, errors: null };
    } catch (errors) {
      console.log("catch works with error", errors);
      return { isSuccess: false, errors };
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

  handleLogin = async (userData) => {};
}

const dbAuthService = new DbAuthService();

module.exports = { dbAuthService };
