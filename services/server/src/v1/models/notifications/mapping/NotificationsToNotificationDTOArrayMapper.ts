import { Mapper } from '@/infrastructure/Mapper';
import { Notification } from '../notification.model';
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
