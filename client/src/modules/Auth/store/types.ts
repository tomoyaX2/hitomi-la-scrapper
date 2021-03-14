export type SignUpFormData = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  login: string;
};

export type LoginFormData = {
  login: string;
  password: string;
};

export type TwoFactorFormData = {
  code: string;
};

export type TwoFactorLoginData = LoginFormData & { code: string };
