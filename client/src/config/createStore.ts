import { createStore, Reducer } from "redux";
import { combineReducers, install } from "redux-loop";
import { authReducer, authState } from "../modules/Auth/store/reducer";
import { mainInitialState, mainReducer } from "../modules/Main/store/reducer";
import {
  profileSettingsReducer,
  profileSettingsState,
} from "../modules/ProfileSettings/store/reducer";
import { usersReducer, usersState } from "../modules/Users/store/reducer";
import { videosReducer, videosState } from "../modules/Videos/store/reducer";

export type State = {
  main: typeof mainInitialState;
  auth: typeof authState;
  users: typeof usersState;
  profileSettings: typeof profileSettingsState;
  videos: typeof videosState;
};

const initalState: State = {
  main: mainInitialState,
  auth: authState,
  users: usersState,
  profileSettings: profileSettingsState,
  videos: videosState,
};

const rootReducer: Reducer<any, any> = combineReducers({
  main: mainReducer,
  auth: authReducer,
  users: usersReducer,
  profileSettings: profileSettingsReducer,
  videos: videosReducer,
});

const store = createStore(rootReducer, initalState, install());

export { store };
