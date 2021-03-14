class AuthService {
  constructor(
    public dbAuthService,
    public secureService,
    public dbSearchService,
    public verificationService
  ) {}

  handleSuccessCredentialSearch = async (data, credentialsSearchResult) => {
    try {
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
    } catch (errors) {
      return { isSuccess: false, errors, data: null };
    }
  };

  initLogin = async (data) => {
    const credentialsSearchResult = await this.dbSearchService.searchForUserByLogin(
      data.login
    );
    const user = credentialsSearchResult.data?.User;
    if (!user.isActive) {
      return {
        isSuccess: false,
        data: null,
        errors: {
          login: "This account doesn't exists or it's not activated yet",
        },
      };
    }
    if (user.isTwoFactorActive) {
      try {
        const code = (Math.random() * 100000).toFixed();
        await this.dbAuthService.updateUserWithCode(user.id, code);
        await this.verificationService.sendSms(user.phone, code);
        return {
          isSuccess: true,
          errors: null,
          data: { message: "Code has been sent to your phone" },
        };
      } catch (errors) {
        console.log(errors, "errors");
        return { isSuccess: false, errors, data: null };
      }
    }
    if (credentialsSearchResult.isSuccess) {
      return this.handleSuccessCredentialSearch(data, credentialsSearchResult);
    }
    return credentialsSearchResult;
  };

  initTwoFactorLogin = async (data) => {
    try {
      const credentialsSearchResult = await this.dbSearchService.searchForUserByLogin(
        data.login
      );
      const user = credentialsSearchResult.data?.User;
      if (user.code === data.code) {
        if (credentialsSearchResult.isSuccess) {
          return this.handleSuccessCredentialSearch(
            data,
            credentialsSearchResult
          );
        }
        return credentialsSearchResult;
      }
      return { isSuccess: false, errors: { code: "Invalid code" }, data: null };
    } catch (errors) {
      return { isSuccess: false, errors, data: null };
    }
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

  initCompareOldPassword = async (credentialId, oldPassword) => {
    const realPassword = await this.dbAuthService.selectUserPassword(
      credentialId
    );
    const isValid = this.secureService.comparePasswords(
      oldPassword,
      realPassword
    );
    if (!isValid) {
      const result = {
        isSuccess: false,
        data: null,
        errors: {
          oldPassword: "Your old password is invalid",
        },
      };
      return result;
    }
    return { isSuccess: true, data: {}, errors: null };
  };
}

export { AuthService };
