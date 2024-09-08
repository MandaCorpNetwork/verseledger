import { Mapper } from '@/infrastructure/Mapper';
import { Notification } from '../notification.model';
import { NotificationDTO } from './NotificationDTO';
import { INotification } from 'vl-shared/src/schemas/NotificationSchema';

export class NotificationsToNotificationDTOArrayMapper extends Mapper<
  Notification[],
  NotificationDTO
> {
  public static override map(artifacts: Notification[]): NotificationDTO[] {
    const response: NotificationDTO[] = [];
    for (const artifact of artifacts) {
      const notification: INotification = artifact.get();
      response.push(new NotificationDTO(notification));
    }
    return response;
  }
}
