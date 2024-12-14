import { Mapper } from '@Infrastructure/Mapper';
import type { Notification } from '@V1/models/notifications/notification.model';
import { NotificationDTO } from './NotificationDTO';

export class NotificationsToNotificationDTOArrayMapper extends Mapper<
  Notification[],
  NotificationDTO
> {
  public static override map(
    artifacts: Notification[] = [],
  ): NotificationDTO[] {
    return artifacts.map((artifact) => {
      const notif = artifact.get();
      return new NotificationDTO(notif);
    });
  }
}
