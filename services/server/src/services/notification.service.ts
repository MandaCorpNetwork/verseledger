import { TYPES } from '@Constant/types';
import { Notification } from '@Models/notification.model';
import { inject, injectable } from 'inversify';
import { col, fn } from 'sequelize';
import { type StompService } from './stomp.service';
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
        where: { user_id: userId },
        attributes: [[fn('COUNT', col('id')), 'unread']],
      });
      return notifications[0].dataValues.unread;
    } catch (e) {
      Logger.error(e);
      return 0;
    }
  }

  //Temporary Notification Service to create Notifications for Actions
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
      resource,
      read: false,
    })
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
}
