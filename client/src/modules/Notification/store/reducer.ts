import { NOTIFICATION } from "./constants";
import { loop, Cmd } from "redux-loop";
import { AnyAction } from "redux";

const notificationState = {
  isVisible: false,
  text: "",
};

const notificationReducer = (state = notificationState, action: AnyAction) => {
  switch (action.type) {
    case NOTIFICATION.SHOW: {
      return loop(
        { ...state, isVisible: true, text: action.text },
        Cmd.run(() => {})
      );
    }
    case NOTIFICATION.HIDE: {
      return loop(
        { ...state, isVisible: false, text: "" },
        Cmd.run(() => {})
      );
    }
    default: {
      return state;
    }
  }
};

export { notificationReducer, notificationState };
