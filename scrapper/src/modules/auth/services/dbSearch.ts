import { TotalUserFields } from "../types";
import { Credentials, User } from "../../../../models";
import { generateLoginErrorData } from "../../../utils/generateLoginErrorData";

class DbSearchService {
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

  searchForExistedName = async (name: string) => {
    const isExistsName = await User.findOne({ where: { name } });
    return !!isExistsName;
  };

  searchForExistedEmail = async (email: string) => {
    const isExistsEmail = await User.findOne({ where: { email } });
    return !!isExistsEmail;
  };

  searchForExistedData = async (user: TotalUserFields) => {
    const searchLoginResult = this.searchForExistedName(user.name);
    const searchEmailResult = this.searchForExistedEmail(user.email);
    const promises = [searchLoginResult, searchEmailResult];
    const result = await Promise.all(promises);
    const isExistsLogin = result[0];
    const isExistsEmail = result[1];
    const errors = generateLoginErrorData({
      isExistsEmail,
      isExistsLogin,
    });
    return errors;
  };

  
  
}

export { DbSearchService };
