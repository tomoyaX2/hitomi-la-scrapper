const { dbAuthService } = require("./db");

class AuthService {
  initLogin = async (data) => {
    const credentialsSearchResult = await dbAuthService.searchForUserByLogin(
      data.login
    );
    if (credentialsSearchResult.isSuccess) {
      const savedPassword = dbAuthService.hashPassword(data.password);
      const isSamePassword =
        credentialsSearchResult.data.password === savedPassword;
      if (isSamePassword) {
        await dbAuthService.setupToken(credentialsSearchResult.data.User.id);
        return credentialsSearchResult;
      }
      return {
        isSuccess: false,
        errors: { token: "cannot setup token" },
        data: null,
      };
    }
    return credentialsSearchResult;
  };

  initRegistration = async ({ login, name, email, password }) => {
    const hashedPassword = this.hashPassword(password);
    const modelToUser = { name, email };
    const modelToCredentials = { login, password: hashedPassword };
    const result = await dbAuthService.handleRegistration({
      modelToUser,
      modelToCredentials,
    });
    return result;
  };
}

const authService = new AuthService();

module.exports = { authService };
