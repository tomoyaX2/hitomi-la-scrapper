import { Modals } from "../../../enums/modals";
import {
  LOGIN,
  RESEND_VERIFICATION,
  SIGN_UP,
  VERIRIFCATION,
} from "./constants";
import { LoginFormData, SignUpFormData } from "./types";
import { loop, Cmd } from "redux-loop";
import {
  loginFailure,
  loginSuccess,
  resendVerificationFailure,
  resendVerificationSuccess,
  signUpFailure,
  signUpSuccess,
  verificationFailure,
  verificationSuccess,
} from "./actions";
import axios from "axios";
import { ApiRoutes } from "../../../enums/apiRoutes";
import { VerifcationFormData } from "../Verification/types";
import { historyService } from "../../../utils/services/history";
import { Routes } from "../../../enums/routes";
import { notificationService } from "../../../utils/services/notification";
import { NotificationTypes } from "../../../enums/notificationTypes";
import { State } from "../../../config/createStore";
import jwt from "jwt-decode";
import { localStorageService } from "../../../utils/services/localStorage";
import { Dispatch } from "redux";
import { getMe } from "../../Users/store/actions";

const authState = {
  activeModal: "" as Modals,
  canResend: false,
};

const selectAuthState = (state: State) => state.auth;

const invalidVerificationLinkMessage =
  "Sorry, but your link is invalid. Please, verify that it has the same structure as in email";
const invalidCodeMessage = "Your code is incorrect";

const handleLogin = async (data: LoginFormData, dispatch: Cmd.Dispatch) => {
  try {
    const response = await axios.post(ApiRoutes.login, data);
    localStorageService.setToken(response.data.data.token);
    dispatch(getMe());
  } catch (e) {
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description: e.response.data.errors.login,
      duration: 10000,
    });
  }
};

const handleSignUp = async (data: SignUpFormData) => {
  try {
    const response = await axios.post(ApiRoutes.signUp, data);
    if (response.data.isSuccess) {
      historyService.history.push(Routes.main);
      notificationService.notify({
        title: "Success",
        description:
          "You account has been registered and we sent instructions to your email!",
      });
      return;
    }
  } catch (e) {
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description:
        e.response?.data?.errors?.name || e.response?.data?.errors?.email,
      duration: 10000,
    });
  }
};

const handleVerification = async ({ code, token }: VerifcationFormData) => {
  try {
    const { userId } = jwt(token) as { userId: string };
    const response = await axios.post(ApiRoutes.verification, { code, userId });
    if (response.data.isSuccess) {
      historyService.history.push(Routes.main);
      notificationService.notify({
        title: "Success",
        description:
          "Your account has been activated. Now, you can log in with your Login and Password",
      });
    }
    return { canResend: false };
  } catch (e) {
    const description = e.response.data.errors.isValidUser
      ? invalidCodeMessage
      : invalidVerificationLinkMessage;
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description,
      duration: 10000,
    });
    return { canResend: true };
  }
};

const hangelResendNotification = async ({
  token,
}: Pick<VerifcationFormData, "token">) => {
  try {
    const { userId } = jwt(token) as { userId: string };
    const response = await axios.post(ApiRoutes.resendVerification, { userId });
    if (response.data.isSuccess) {
      notificationService.notify({
        title: "Success",
        description: "Email has been resent to you",
      });
    }
  } catch (e) {
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description: e.response?.data?.errors?.date,
    });
  }
};

const authReducer = (
  state = authState,
  action: {
    type: keyof typeof LOGIN & keyof typeof SIGN_UP;
    data: LoginFormData | SignUpFormData | VerifcationFormData;
  }
) => {
  switch (action.type) {
    case LOGIN.INIT: {
      return loop(
        { ...state },
        Cmd.run(handleLogin, {
          successActionCreator: loginSuccess,
          failActionCreator: loginFailure,
          args: [
            action.data as LoginFormData,
            Cmd.dispatch as typeof Cmd.dispatch,
          ],
        })
      );
    }
    case SIGN_UP.INIT: {
      return loop(
        { ...state },
        Cmd.run(handleSignUp, {
          successActionCreator: signUpSuccess,
          failActionCreator: signUpFailure,
          args: [action.data as SignUpFormData],
        })
      );
    }
    case VERIRIFCATION.INIT: {
      return loop(
        { ...state },
        Cmd.run(handleVerification, {
          successActionCreator: verificationSuccess,
          failActionCreator: verificationFailure,
          args: [action.data as VerifcationFormData],
        })
      );
    }
    case VERIRIFCATION.SUCCESS: {
      return { ...state, ...action.data };
    }
    case RESEND_VERIFICATION.INIT: {
      return loop(
        { ...state, canResend: false },
        Cmd.run(hangelResendNotification, {
          successActionCreator: resendVerificationSuccess,
          failActionCreator: resendVerificationFailure,
          args: [action.data as Pick<VerifcationFormData, "token">],
        })
      );
    }
    default:
      return state;
  }
};

export { authReducer, authState, selectAuthState };
