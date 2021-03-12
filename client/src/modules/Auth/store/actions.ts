import { LOGIN, SIGN_UP } from "./constants";
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
