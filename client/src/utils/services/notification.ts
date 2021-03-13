import { Notification } from "rsuite";
import { NotificationTypes } from "../../enums/notificationTypes";

class NotificationService {
  notify = ({
    title,
    description,
    type = NotificationTypes.success,
    duration = 5000,
  }: {
    title: string;
    description?: string;
    type?: NotificationTypes;
    duration?: number;
  }) => {
    switch (type) {
      case NotificationTypes.success: {
        Notification.info({
          title,
          description,
          duration,
        });
        return;
      }
      case NotificationTypes.error: {
        return Notification.error({
          title,
          description,
          duration,
        });
      }
    }
  };
}

const notificationService = new NotificationService();

export { notificationService };
