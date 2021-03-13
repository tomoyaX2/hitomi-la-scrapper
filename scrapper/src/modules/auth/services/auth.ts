class AuthService {
  constructor(
    public dbAuthService,
    public secureService,
    public dbSearchService
  ) {}

  handleSuccessCredentialSearch = async (data, credentialsSearchResult) => {
    const savedPassword = this.secureService.createHash(data.password);
    const isSamePassword =
      credentialsSearchResult?.data?.password === savedPassword;
    if (isSamePassword) {
      const token = await this.dbAuthService.setupToken(
        credentialsSearchResult.data.User.id
      );
      return {
        isSuccess: true,
        errors: null,
        data: { token },
      };
    }
    return {
      isSuccess: false,
      errors: { login: "Login or password is invalid" },
      data: null,
    };
  };

  initLogin = async (data) => {
    const credentialsSearchResult = await this.dbSearchService.searchForUserByLogin(
      data.login
    );
    if (credentialsSearchResult.isSuccess) {
      return this.handleSuccessCredentialSearch(data, credentialsSearchResult);
    }
    return credentialsSearchResult;
  };

  initRegistration = async ({ login, name, email, password }) => {
    const hashedPassword = this.secureService.createHash(password);
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
