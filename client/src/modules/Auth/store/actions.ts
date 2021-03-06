import {
  LOGIN,
  RESEND_VERIFICATION,
  SIGN_UP,
  TWO_FACTOR,
  VERIRIFCATION,
} from "./constants";
import { LoginFormData, SignUpFormData, TwoFactorLoginData } from "./types";

export const login = (data: LoginFormData) => ({
  type: LOGIN.INIT,
  data,
});

export const loginSuccess = (data: { visibleTwoFactor: boolean }) => ({
  type: LOGIN.SUCCESS,
  data,
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

export const verfication = (code: string, token: string) => ({
  type: VERIRIFCATION.INIT,
  data: { code, token },
});

export const verificationSuccess = (data: { canResend: boolean }) => ({
  type: VERIRIFCATION.SUCCESS,
  data,
});

export const verificationFailure = () => ({
  type: VERIRIFCATION.FAILURE,
});

export const resendVerification = (token: string) => ({
  type: RESEND_VERIFICATION.INIT,
  data: { token },
});

export const resendVerificationSuccess = () => ({
  type: RESEND_VERIFICATION.SUCCESS,
});

export const resendVerificationFailure = () => ({
  type: RESEND_VERIFICATION.FAILURE,
});

export const twoFactorLogin = (data: TwoFactorLoginData) => ({
  type: TWO_FACTOR.INIT,
  data,
});

export const twoFactorSuccess = () => ({
  type: TWO_FACTOR.SUCCESS,
});

export const twoFactorFailure = () => ({
  type: TWO_FACTOR.FAILURE,
});
