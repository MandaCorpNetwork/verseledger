import { TYPES } from '@Constant/types';
import { Notification } from '@V1/models/notifications/notification.model';
import { inject, injectable } from 'inversify';
import { col, fn } from 'sequelize';
import { type StompService } from '@V1/services/stomp.service';
import { Logger } from '@/utils/Logger';

@injectable()
export class NotificationService {
  constructor() {
    Logger.init();
  }
  @inject(TYPES.StompService) private stomp!: StompService;

  public async getNotifications(userId: string, limit = 20) {
    return Notification.findAll({
      where: { user_id: userId },
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (notifications[0].dataValues as any).unread;
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
    this.publish(`/topic/notifications-${user_id}`, text);
    return notification;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async publish(destination: string, body: Record<any, any> | string) {
    return this.stomp.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}
