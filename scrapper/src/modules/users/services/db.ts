import { Credentials, User } from "../../../../models";

class DbUserService {
  constructor(public userService, public verificationService) {}
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
      const currentUserPhone = await this.selectUserPhone(data.id);
      const isPhoneChanged = currentUserPhone !== userFields.phone;
      if (isPhoneChanged) {
        if (!!userFields.phone) {
          await this.verificationService.initVerifyPhone(
            data.id,
            userFields.phone
          );
        } else {
          await this.updateUserPhoneState(data.id, false);
        }
      }
      const credential = Credentials.update(credentialFields, {
        where: { id: data.credentialId },
      });
      const user = User.update(userFields, { where: { id: data.id } });
      await Promise.all([credential, user]);
      return { isSuccess: true, data: {}, errors: null };
    } catch (errors) {
      console.log(errors, "errors");
      return { isSuccess: false, data: null, errors };
    }
  };

  selectUserPhone = async (id) => {
    const user = await User.findOne({ where: { id } });
    return user.phone;
  };

  updateUserPhoneState = async (id, isPhoneSubmitted) => {
    await User.update(
      { isPhoneSubmitted, isTwoFactorActive: isPhoneSubmitted },
      { where: { id } }
    );
  };
}

export { DbUserService };
