import { Modals } from "../../../enums/modals";
import { LOGIN, SIGN_UP } from "./constants";
import { LoginFormData, SignUpFormData } from "./types";
import { loop, Cmd } from "redux-loop";
import {
  loginFailure,
  loginSuccess,
  signUpFailure,
  signUpSuccess,
} from "./actions";
import axios from "axios";
import { ApiRoutes } from "../../../enums/apiRoutes";

const authState = {
  activeModal: "" as Modals,
  signUpFormData: {} as SignUpFormData,
  loginFormData: {} as LoginFormData,
};

const handleLogin = async (data: LoginFormData) => {
  const response = await axios.post(ApiRoutes.login, data);
  console.log(response, "response");
};

const handleSignUp = async (data: SignUpFormData) => {
  const response = await axios.post(ApiRoutes.signUp, data);
  console.log(response, "response");
};

const authReducer = (
  state = authState,
  action: {
    type: keyof typeof LOGIN & keyof typeof SIGN_UP;
    data: LoginFormData | SignUpFormData;
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
    default:
      return state;
  }
};

export { authReducer, authState };
