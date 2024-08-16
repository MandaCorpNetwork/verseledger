import { TYPES } from '@Constant/types';
import { Notification } from '@V1/notifications/notification.model';
import { inject, injectable } from 'inversify';
import { col, fn } from 'sequelize';
import { type StompService } from '../../../../services/stomp.service';
import { Logger } from '@/utils/Logger';

@injectable()
export class NotificationService {
  constructor() {
    Logger.init();
  }
  @inject(TYPES.StompService) private stomp!: StompService;

  public async getNotifications(userId: string, limit = 20) {
    return Notification.findAll({
      where: { user_id: userId, read: false },
      limit,
      order: [['createdAt', 'DESC']],
    });
  }

  public async getUnreadCount(userId: string) {
    try {
      const notifications = await Notification.findAll({
        where: { user_id: userId, read: false },
        attributes: [[fn('COUNT', col('id')), 'unread']],
      });
      return notifications[0].dataValues.unread;
    } catch (e) {
      Logger.error(e);
      return 0;
    }
  }

  //Temporary Notification Service to create Notifications for Actions until Stomp Service is updated
  public async createNotification({
    user_id,
    text,
    resource,
  }: {
    user_id: string;
    text: string;
    resource: string;
  }) {
    const notification = await Notification.create({
      user_id,
      text,
      //Resource = topic/feature (I.E. "contracts" or "orders")/id/item (I.E. "status" or "bid")/action (I.E. "created" or "updated")
      resource,
      read: false,
    });
    this.publish(`/topic/notifications/${user_id}`, text);
    return notification;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async publish(destination: string, body: Record<any, any> | string) {
    //TODO: Wire up mode - STAGING
    //return false
    return this.stomp.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }

  public async markAllRead(userId: string) {
    const [updatedRows] = await Notification.update(
      { read: true },
      {
        where: { user_id: userId, read: false },
      },
    );
    return updatedRows;
  }

  public async markRead(userId: string, notificationId: string) {
    const readNotification = await Notification.update(
      { read: true },
      {
        where: {
          user_id: userId,
          id: notificationId,
        },
      },
    );
    return readNotification;
  }
}
