import {
  BaseHttpController,
  controller,
  httpGet,
  httpPatch,
  next,
  requestParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/models/user/user.service';
import { NotificationService } from '@V1/models/notifications/notification.service';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { ApiPath } from 'swagger-express-ts';
import { NextFunction } from 'express';
import { IdUtil } from '@/utils/IdUtil';
import { NotificationToNotificationDTOMapper } from './mapping/NotificationToNotificationDTOMapper';
import { NotFoundError } from '@V1/errors/NotFoundError';

@ApiPath({
  path: '/v1/notifications',
  name: 'Notifications',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/notifications', TYPES.AuthMiddleware)
export class NotificationsController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.NotificationService)
    private notificationService: NotificationService,
  ) {
    super();
  }

  @httpGet('/')
  private getNotifications(
    @requestParam('unreadOnly') unreadOnly: boolean = false,
  ) {
    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    return this.notificationService.getNotifications(userId, 20, {
      unreadOnly,
    });
  }

  @httpGet('/unreadCount')
  private async getUnreadCount() {
    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    const unread = await this.notificationService.getUnreadCount(userId);
    return this.json({ unread });
  }

  @httpPatch(
    `/:notificationId(${IdUtil.expressRegex(IdUtil.IdPrefix.Notification)})`,
    TYPES.AuthMiddleware,
  )
  private async updateNotification(
    @requestParam('notificationId') notificationId: string,
    @next() nextFunc: NextFunction,
  ) {
    const notif = await this.notificationService.markRead(notificationId);

    if (notif) return NotificationToNotificationDTOMapper.map(notif);
    return nextFunc(new NotFoundError(`/v1/notifications/${notificationId}`));
  }
}
