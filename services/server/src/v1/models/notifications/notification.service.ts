import { TYPES } from '@Constant/types';
import { Notification } from '@V1/models/notifications/notification.model';
import { inject, injectable } from 'inversify';
import { col, fn } from 'sequelize';
import { type StompService } from '@V1/services/stomp.service';
import { Logger } from '@/utils/Logger';
import { NotificationToContractDTOMapper } from './mapping/NotificationToNotificationDTOMapper';

@injectable()
export class NotificationService {
  constructor() {
    Logger.init();
  }
  @inject(TYPES.StompService) private socket!: StompService;

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

  createHyperlink(text: string, url: string) {
    return `[${text}](${encodeURI(url)})`;
  }

  public async createNotification({
    user_id,
    message,
    action,
  }: {
    user_id: string;
    message: string;
    action?: string;
  }) {
    const notification = await Notification.create({
      user_id,
      message,
      action,
      read: false,
    });
    this.socket.publish(
      `/topic/notifications-${user_id}`,
      NotificationToContractDTOMapper.map(notification),
    );
    return notification;
  }
}
