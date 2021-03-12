import { Notification } from "rsuite";
import { NotificationTypes } from "../../enums/notificationTypes";

class NotificationService {
  duration = 5000;
  notify = ({
    title,
    description,
    type = NotificationTypes.success,
  }: {
    title: string;
    description?: string;
    type?: NotificationTypes;
  }) => {
    switch (type) {
      case NotificationTypes.success: {
        Notification.info({
          title,
          description,
          duration: this.duration,
        });
        return;
      }
      case NotificationTypes.error: {
        return Notification.error({
          title,
          description,
          duration: this.duration,
        });
      }
    }
  };

  changeDuration = (duration: number) => {
    this.duration = duration;
  };
}

const notificationService = new NotificationService();

export { notificationService };
