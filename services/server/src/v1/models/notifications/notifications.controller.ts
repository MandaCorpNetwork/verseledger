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
import { BadParameterError } from '@V1/errors/BadParameter';
import { Logger } from '@/utils/Logger';
import { BadRequestErrorMessageResult } from 'inversify-express-utils/lib/results';
import { GenericError } from '@V1/errors/GenericError';
import { ZodError } from 'zod';

@ApiPath({
  path: '/v1/notifications',
  name: 'Notifications',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/notifications')
export class NotificationsController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.NotificationService)
    private notificationService: NotificationService,
  ) {
    super();
  }

  @httpGet('/') private getNotifications() {
    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    return this.notificationService.getNotifications(userId, 20);
  }
  @httpGet('/unreadCount') private async getUnreadCount() {
    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    const unread = await this.notificationService.getUnreadCount(userId);
    return this.json({ unread });
  }
  @httpGet('/markAllRead', TYPES.AuthMiddleware)
  private async markAllRead(@next() nextFunc: NextFunction) {
    try {
      const userId = (this.httpContext.user as VLAuthPrincipal).id;
      if (!IdUtil.isValidId(userId)) {
        Logger.error('Invalid User ID');
        throw nextFunc(
          new BadParameterError(
            'userId',
            `/markAllRead/:userId(${IdUtil.expressRegex(IdUtil.IdPrefix.User)})`,
          ),
        );
      }
      Logger.info(`User(${userId}) marking all notifications read`);
      const updatedRows = await this.notificationService.markAllRead(userId);
      Logger.info(`Updated Notifications:`, updatedRows);
      return this.ok(updatedRows);
    } catch (error) {
      throw nextFunc(new BadRequestErrorMessageResult(error as string));
    }
  }
  @httpPatch(
    `/:notificationId(${IdUtil.expressRegex(IdUtil.IdPrefix.Notification)})`,
    TYPES.AuthMiddleware,
  )
  private async markRead(
    @requestParam('notificationId') notificationId: string,
    @next() nextFunc: NextFunction,
  ) {
    Logger.info(
      `Received request to mark notification ${notificationId} as read`,
    );
    try {
      if (!IdUtil.isValidId(notificationId)) {
        Logger.error('Invalid Notification ID');
        throw nextFunc(
          new BadParameterError(
            'notificationId',
            `/:notificationId(${IdUtil.expressRegex(IdUtil.IdPrefix.Notification)})`,
          ),
        );
      }
      const userId = (this.httpContext.user as VLAuthPrincipal).id;
      const readNotify = await this.notificationService.markRead(
        userId,
        notificationId,
      );
      return this.ok(readNotify);
    } catch (error) {
      throw nextFunc(new GenericError(400, (error as ZodError).issues));
    }
  }
}
