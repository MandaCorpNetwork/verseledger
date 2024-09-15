import { TYPES } from '@Constant/types';
import { Notification } from '@V1/models/notifications/notification.model';
import { inject, injectable } from 'inversify';
import { col, fn } from 'sequelize';
import { type StompService } from '@V1/services/stomp.service';
import { Logger } from '@/utils/Logger';
import { NotificationToNotificationDTOMapper } from './mapping/NotificationToNotificationDTOMapper';
import { INotificationAction } from 'vl-shared/src/schemas/NotificationSchema';
import { NotificationsToNotificationDTOArrayMapper } from './mapping/NotificationsToNotificationDTOArrayMapper';

@injectable()
export class NotificationService {
  constructor() {
    Logger.init();
  }
  @inject(TYPES.StompService) private socket!: StompService;

  public async getNotifications(
    user_id: string,
    limit = 20,
    filter?: { unreadOnly: boolean },
  ) {
    const notifications = await Notification.findAll({
      where: { user_id, ...(filter?.unreadOnly ? { read: false } : {}) },
      limit,
      order: [['createdAt', 'DESC']],
    });
    return NotificationsToNotificationDTOArrayMapper.map(notifications);
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

  public async markRead(notificationId: string) {
    const notification = await Notification.findByPk(notificationId);
    if (notification == null) return null;
    return await notification.set('read', true).save();
  }

  public async createNotification(
    user_id: string,
    message: string,
    action?: INotificationAction,
  ) {
    const notification = await Notification.create({
      user_id,
      message,
      action: action ? JSON.stringify(action) : undefined,
      read: false,
    });
    this.socket.publish(
      `/topic/notifications-${user_id}`,
      NotificationToNotificationDTOMapper.map(notification),
    );
    return notification;
  }

  public async dismiss(notification_id: string, user_id?: string) {
    return Notification.destroy({ where: { id: notification_id, user_id } });
  }
  public async dismissAll(user_id: string) {
    return Notification.destroy({ where: { user_id } });
  }
}
