import { RegistrationModels } from "../types";
import { Credentials, Role, User } from "../../../../models";
import { UserFields } from "../../../../models/user";
import moment from "moment";
import { MomentFormats } from "../../../enums/momentFormats";

class DbAuthService {
  constructor(public secureService, public dbSearchService) {}

  setupToken = async (user_id: string) => {
    const token = this.secureService.createToken();
    await Credentials.update({ token }, { where: { user_id: user_id } });
    return token;
  };

  generateUserCredentials = async ({
    modelToUser,
    modelToCredentials,
  }: RegistrationModels) => {
    try {
      const userRole = await Role.findOne({ where: { name: "user" } });
      const dbUser = await User.create({
        ...modelToUser,
        role_id: userRole.id,
      });
      const user = dbUser.toJSON() as UserFields;
      await Credentials.create({
        ...modelToCredentials,
        user_id: user.id,
        token: "",
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
    const result = await this.dbSearchService.searchForExistedData(modelToUser);
    if (result.isSuccess) {
      const result = this.generateUserCredentials({
        modelToUser,
        modelToCredentials,
      });
      return result;
    }
    return result;
  };

  verifyResendState = async (userId: string) => {
    const user = await User.findOne({ where: { id: userId } });
    const currentDate = new Date();
    const allowedDate = user.resendTime;
    if (currentDate.getTime() < allowedDate) {
      return {
        isSuccess: false,
        errors: {
          date: `You can get a new link in ${moment(
            allowedDate,
            MomentFormats.miliseconds
          ).format(MomentFormats.default)}`,
        },
      };
    }
    return { isSuccess: true, errors: null, user };
  };

  updateResendState = async (userId, code) => {
    const dateToSet = new Date().setHours(new Date().getHours() + 1);
    const resendTime = new Date(dateToSet).getTime();
    await User.update({ code, resendTime }, { where: { id: userId } });
    return resendTime;
  };

  updateUserWithCode = async (userId, code) => {
    await User.update({ code }, { where: { id: userId } });
  };


  initiateUserActivation = async (code, userId) => {
    const user = await User.findOne({ where: { id: userId } });
    const isValidUser = !!user;
    const isValidCode = user?.code === code;
    if (isValidUser && isValidCode) {
      await User.update(
        { code: null, isActive: true },
        { where: { id: userId } }
      );
      return { isSuccess: true, errors: null };
    }
    return { isSuccess: false, errors: { isValidCode, isValidUser } };
  };

  selectUserPassword = async (id: string) => {
    const credential = await Credentials.findOne({ where: { id } });
    return credential.password;
  };

  updateUserPhoneState = async (id, isPhoneSubmitted) => {
    await User.update({ isPhoneSubmitted }, { where: { id } });
  };
}

export { DbAuthService };
