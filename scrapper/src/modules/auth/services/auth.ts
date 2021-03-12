class AuthService {
  constructor(public dbAuthService) {}
  initLogin = async (data) => {
    const credentialsSearchResult = await this.dbAuthService.searchForUserByLogin(
      data.login
    );
    if (credentialsSearchResult.isSuccess) {
      const savedPassword = this.dbAuthService.hashPassword(data.password);
      const isSamePassword =
        credentialsSearchResult.data.password === savedPassword;
      if (isSamePassword) {
        await this.dbAuthService.setupToken(
          credentialsSearchResult.data.User.id
        );
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
    const hashedPassword = this.dbAuthService.hashPassword(password);
    const modelToUser = { name, email };
    const modelToCredentials = { login, password: hashedPassword };
    const result = await this.dbAuthService.handleRegistration({
      modelToUser,
      modelToCredentials,
    });
    return result;
  };

  validateIncomingPasswords = (password, passwordConfirm) => {
    return password === passwordConfirm;
  };
}

export { AuthService };
