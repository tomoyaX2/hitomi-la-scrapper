import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./constants";

const notificationState = {
  isVisible: false,
  text: "",
};

const showNotification = (text: string) => {
  return {
    type: SHOW_NOTIFICATION,
    text,
  };
};

const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION,
  };
};

const notificationReducer = (state = notificationState, action: any) => {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      return { ...state, isVisible: true, text: action.text };
    }
    case HIDE_NOTIFICATION: {
      return { ...state, isVisible: false, text: "" };
    }
    default: {
      return state;
    }
  }
};

export {
  showNotification,
  notificationReducer,
  hideNotification,
  notificationState,
};
