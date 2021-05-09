import axios from "axios";
import { AnyAction } from "redux";
import { Cmd, loop } from "redux-loop";
import { State } from "../../../config/createStore";
import { NotificationTypes } from "../../../enums/notificationTypes";
import { Roles } from "../../../enums/roles";
import { Routes } from "../../../enums/routes";
import { localStorageService } from "../../../utils/services/localStorage";
import { notificationService } from "../../../utils/services/notification";
import { getMeFailure, getMeSuccess, logoutSuccess } from "./actions";
import { GET_ME, LOGOUT } from "./constants";
import { UserData } from "./types";

const selectMe = (state: State) => state.users.me;
const selectLoadingState = (state: State) => state.users.isLoaded;
const selectUserRole = (state: State) => state.users?.me?.role;
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
      const role = !action.data?.id ? { name: Roles.unauth } : action.data.role;
      return {
        ...state,
        me: {
          ...action.data,
          role,
          phone: !!action.data?.phone ? action.data.phone : "",
        },
        isLoaded: true,
      };
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
      return { ...state, me: { role: { name: Roles.unauth } } };
    }
    default:
      return state;
  }
};

export {
  usersState,
  usersReducer,
  selectMe,
  selectLoadingState,
  selectUserRole,
};
