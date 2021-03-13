import { User } from "../../../../models";

class DbUserService {
  selectUserByToken = async (token: string) => {
    const user = await User.findOne({
      where: { token },
      include: ["role"],
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
}

export { DbUserService };
