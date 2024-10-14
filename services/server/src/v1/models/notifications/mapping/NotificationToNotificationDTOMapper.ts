import { Mapper } from '@Infrastructure/Mapper';
import { Notification } from '@V1/models/notifications/notification.model';
import { NotificationDTO } from './NotificationDTO';
import { INotification } from 'vl-shared/src/schemas/NotificationSchema';

export class NotificationToNotificationDTOMapper extends Mapper<
  Notification,
  NotificationDTO
> {
  public static override map(artifact: Notification): NotificationDTO {
    const notification: INotification = artifact.get();
    return new NotificationDTO(notification);
  }
}
