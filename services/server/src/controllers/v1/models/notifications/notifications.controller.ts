import {
  BaseHttpController,
  controller,
  httpGet,
  httpPatch,
  next,
  requestBody,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/user/user.service';
import { NotificationService } from '@V1/notifications/notification.service';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { ApiPath } from 'swagger-express-ts';
import { NextFunction } from 'express';
import { IdUtil } from '@/utils/IdUtil';
import { BadParameterError } from '@Errors/BadParameter';
import { Logger } from '@/utils/Logger';
import { BadRequestErrorMessageResult } from 'inversify-express-utils/lib/results';
import { BodyError } from '@Errors/BodyError';

@ApiPath({
  path: '/v1/notifications',
  name: 'Notifications',
  security: { VLAuthAccessToken: [] },
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
  @httpGet('/markAllRead', TYPES.VerifiedUserMiddleware)
  private async markAllRead(
    @next() nextFunc: NextFunction,
  ) {
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
  @httpGet('/markRead/:notificationId')
}
