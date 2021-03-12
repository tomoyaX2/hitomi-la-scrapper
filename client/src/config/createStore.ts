import { createStore, Reducer } from "redux";
import { combineReducers, install } from "redux-loop";
import { authReducer, authState } from "../modules/Auth/store/reducer";
import { mainInitialState, mainReducer } from "../modules/Main/store/reducer";

type InitialState = {
  main: typeof mainInitialState;
  auth: typeof authState;
};

const initalState: InitialState = {
  main: mainInitialState,
  auth: authState,
};

const rootReducer: Reducer<any, any> = combineReducers({
  main: mainReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, initalState, install());

export { store };
