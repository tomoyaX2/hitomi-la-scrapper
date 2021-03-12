import { LOGIN, SIGN_UP, VERIRIFCATION } from "./constants";
import { LoginFormData, SignUpFormData } from "./types";

export const login = (data: LoginFormData) => ({
  type: LOGIN.INIT,
  data,
});

export const loginSuccess = () => ({
  type: LOGIN.SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN.FAILURE,
});

export const signUp = (data: SignUpFormData) => ({
  type: SIGN_UP.INIT,
  data,
});

export const signUpSuccess = () => ({
  type: SIGN_UP.SUCCESS,
});

export const signUpFailure = () => ({
  type: SIGN_UP.FAILURE,
});

export const verfication = (code: string, userId: string) => ({
  type: VERIRIFCATION.INIT,
  data: { code, userId },
});

export const verificationSuccess = () => ({
  type: VERIRIFCATION.SUCCESS,
});

export const verificationFailure = () => ({
  type: VERIRIFCATION.FAILURE,
});
