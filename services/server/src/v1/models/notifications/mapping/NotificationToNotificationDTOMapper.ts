import { Mapper } from '@/infrastructure/Mapper';
import { Notification } from '../notification.model';
import { NotificationDTO } from './NotificationDTO';
import { INotification } from 'vl-shared/src/schemas/NotificationSchema';

export class NotificationToContractDTOMapper extends Mapper<
  Notification,
  NotificationDTO
> {
  public static override map(artifact: Notification): NotificationDTO {
    const notification: INotification = artifact.get();
    return new NotificationDTO(notification);
  }
}
