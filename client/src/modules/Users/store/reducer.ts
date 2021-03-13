import axios from "axios";
import { AnyAction } from "redux";
import { Cmd, loop } from "redux-loop";
import { Routes } from "../../../enums/routes";
import { getMeFailure, getMeSuccess } from "./actions";
import { GET_ME } from "./constants";

const usersState = {
  me: {},
  guuest: {},
};

const handleGetMe = async () => {
  const response = await axios.get(Routes.me);
  console.log(response, "response");
};

const usersReducer = (state = usersState, action: AnyAction) => {
  switch (action.type) {
    case GET_ME.INIT: {
      return loop(
        { ...state },
        Cmd.run(handleGetMe, {
          successActionCreator: getMeSuccess,
          failActionCreator: getMeFailure,
          args: [],
        })
      );
    }
    default:
      return state;
  }
};

export { usersState, usersReducer };
