import { NOTIFICATION } from "./constants";

const showNotification = (text: string) => {
  return {
    type: NOTIFICATION.SHOW,
    text,
  };
};

const hideNotification = () => {
  return {
    type: NOTIFICATION.HIDE,
  };
};

export { showNotification, hideNotification };
