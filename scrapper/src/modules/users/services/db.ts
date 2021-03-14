import { userService } from "..";
import { Credentials, User } from "../../../../models";

class DbUserService {
  constructor(public userService) {}
  selectUserByToken = async (token: string) => {
    const user = await Credentials.findOne({
      where: { token },
      include: [{ model: User, include: ["role"] }],
    });
    if (!!user) {
      return { isSuccess: true, data: user, errors: null };
    }
    return {
      isSuccess: false,
      data: null,
      errors: { token: "Token is invalid" },
    };
  };

  updateUserProfileData = async (data) => {
    try {
      const {
        credentialFields,
        userFields,
      } = this.userService.formatUserAndCredentialsDataToUpdate(data);
      const credential = Credentials.update(credentialFields, {
        where: { id: data.credentialId },
      });
      const user = User.update(userFields, { where: { id: data.id } });
      await Promise.all([credential, user]);
      
      return { isSuccess: true, data: {}, errors: null };
    } catch (errors) {
      return { isSuccess: false, data: null, errors };
    }
  };
}

export { DbUserService };
