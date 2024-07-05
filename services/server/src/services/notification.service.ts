import { Notification } from '@Models/notification.model';
import { injectable } from 'inversify';
import { col, fn } from 'sequelize';

@injectable()
export class NotificationService {
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
    } catch (error) {
      return 0;
    }
  }
}
