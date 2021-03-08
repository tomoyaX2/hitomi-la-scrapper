import { createStore, Reducer } from "redux";
import { combineReducers, install } from "redux-loop";
import { mainInitialState, mainReducer } from "../modules/Main/store";
import {
  notificationReducer,
  notificationState,
} from "../modules/Notification/store";

type InitialState = {
  main: typeof mainInitialState;
  notification: typeof notificationState;
};

const initalState: InitialState = {
  main: mainInitialState,
  notification: notificationState,
};

const rootReducer: Reducer = combineReducers({
  main: mainReducer,
  notification: notificationReducer,
});

const store = createStore(rootReducer, initalState, install());

export { store };
