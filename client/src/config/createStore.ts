import { createStore, Reducer } from "redux";
import { combineReducers, install } from "redux-loop";
import { authReducer, authState } from "../modules/Auth/store/reducer";
import { mainInitialState, mainReducer } from "../modules/Main/store/reducer";
import {
  notificationReducer,
  notificationState,
} from "../modules/Notification/store/reducer";

type InitialState = {
  main: typeof mainInitialState;
  notification: typeof notificationState;
  auth: typeof authState;
};

const initalState: InitialState = {
  main: mainInitialState,
  notification: notificationState,
  auth: authState,
};

const rootReducer: Reducer<any, any> = combineReducers({
  main: mainReducer,
  notification: notificationReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, initalState, install());

export { store };
