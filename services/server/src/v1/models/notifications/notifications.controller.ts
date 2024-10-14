import {
  BaseHttpController,
  controller,
  httpDelete,
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
import { NextFunction } from 'express';
import { IdUtil } from '@Utils/IdUtil';
import { NotificationToNotificationDTOMapper } from './mapping/NotificationToNotificationDTOMapper';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { ApiPath } from 'swagger-express-ts';

@ApiPath({
  path: '/v1/notifications',
  name: 'Notifications',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/notifications', TYPES.AuthMiddleware)
export class NotificationsController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.NotificationService)
    private readonly notificationService: NotificationService,
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

  @httpDelete(
    `/:notificationId(${IdUtil.expressRegex(IdUtil.IdPrefix.Notification)})`,
    TYPES.AuthMiddleware,
  )
  private async dismissNotification(
    @requestParam('notificationId') notificationId: string,
    @next() nextFunc: NextFunction,
  ) {
    const user_id = (this.httpContext.user as VLAuthPrincipal).id;
    const destroyedRowsCount = await this.notificationService.dismiss(
      notificationId,
      user_id,
    );

    if (destroyedRowsCount) return destroyedRowsCount;
    return nextFunc(new NotFoundError(`/v1/notifications/${notificationId}`));
  }

  @httpDelete(`/`, TYPES.AuthMiddleware)
  private async dismissAllNotifications(@next() nextFunc: NextFunction) {
    const user_id = (this.httpContext.user as VLAuthPrincipal).id;
    const destroyedRowsCount =
      await this.notificationService.dismissAll(user_id);

    if (destroyedRowsCount) return destroyedRowsCount;
    return nextFunc(new NotFoundError(`/v1/notifications/`));
  }
}
