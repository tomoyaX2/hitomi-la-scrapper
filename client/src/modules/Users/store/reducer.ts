import axios from "axios";
import { AnyAction } from "redux";
import { Cmd, loop } from "redux-loop";
import { State } from "../../../config/createStore";
import { NotificationTypes } from "../../../enums/notificationTypes";
import { Roles } from "../../../enums/roles";
import { Routes } from "../../../enums/routes";
import { localStorageService } from "../../../utils/services/localStorage";
import { notificationService } from "../../../utils/services/notification";
import { permissionService } from "../../../utils/services/permissions";
import { getMeFailure, getMeSuccess, logoutSuccess } from "./actions";
import { GET_ME, LOGOUT } from "./constants";
import { UserData } from "./types";

const selectMe = (state: State) => state.users.me;
const selectLoadingState = (state: State) => state.users.isLoaded;
const usersState = {
  me: {} as UserData,
  guuest: {},
  isLoaded: false,
};

const handleGetMe = async () => {
  try {
    const token = localStorageService.getToken();
    if (!token) {
      return {};
    }
    axios.defaults.headers.authorization = token;
    const response = await axios.get(Routes.me);
    permissionService.setupRole(response.data.data?.role);
    return response.data.data;
  } catch (e) {
    notificationService.notify({
      title: "Error",
      type: NotificationTypes.error,
      description: "Cannot get user",
    });
  }
};

const initLogout = () => {
  permissionService.setupRole(Roles.unauth);
  localStorageService.removeToken();
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
    case GET_ME.SUCCESS: {
      return { ...state, me: action.data, isLoaded: true };
    }
    case LOGOUT.INIT: {
      return loop(
        { ...state },
        Cmd.run(initLogout, {
          successActionCreator: logoutSuccess,
          args: [],
        })
      );
    }
    case LOGOUT.SUCCESS: {
      return { ...state, me: {} };
    }
    default:
      return state;
  }
};

export { usersState, usersReducer, selectMe, selectLoadingState };
