import { Modals } from "../../../enums/modals";
import { LOGIN, SIGN_UP, VERIRIFCATION } from "./constants";
import { LoginFormData, SignUpFormData } from "./types";
import { loop, Cmd } from "redux-loop";
import {
  loginFailure,
  loginSuccess,
  signUpFailure,
  signUpSuccess,
  verificationFailure,
  verificationSuccess,
} from "./actions";
import axios from "axios";
import { ApiRoutes } from "../../../enums/apiRoutes";
import { VeririfcationFormProps } from "../Verification/types";
import { historyService } from "../../../utils/services/history";
import { Routes } from "../../../enums/routes";
import { notificationService } from "../../../utils/services/notification";

const authState = {
  activeModal: "" as Modals,
};

const handleLogin = async (data: LoginFormData) => {
  const response = await axios.post(ApiRoutes.login, data);
  console.log(response, "response");
};

const handleSignUp = async (data: SignUpFormData) => {
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
};

const handleVerification = async ({ code, userId }: VeririfcationFormProps) => {
  console.log(code);
  const response = await axios.post(ApiRoutes.verification, { code, userId });
  if (response.data.isSuccess) {
    historyService.history.push(Routes.main);
    notificationService.notify({
      title: "Success",
      description:
        "Your account has been activated. Now, you can log in with your Login and Password",
    });
  }
  console.log(response, "response");
};

const authReducer = (
  state = authState,
  action: {
    type: keyof typeof LOGIN & keyof typeof SIGN_UP;
    data: LoginFormData | SignUpFormData | VeririfcationFormProps;
  }
) => {
  switch (action.type) {
    case LOGIN.INIT: {
      return loop(
        { ...state },
        Cmd.run(handleLogin, {
          successActionCreator: loginSuccess,
          failActionCreator: loginFailure,
          args: [action.data as LoginFormData],
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
          args: [action.data as VeririfcationFormProps],
        })
      );
    }
    default:
      return state;
  }
};

export { authReducer, authState };
