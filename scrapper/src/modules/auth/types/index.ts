interface TotalUserFields {
  name?: string;
  email?: string;
  login?: string;
  password?: string;
}

interface RegistrationModels {
  modelToUser: {
    email: string;
    name: string;
  };
  modelToCredentials: {
    login: string;
    password: string;
  };
}

interface UserErrors extends TotalUserFields {
  isSuccess: boolean;
}

export { TotalUserFields, UserErrors, RegistrationModels };
