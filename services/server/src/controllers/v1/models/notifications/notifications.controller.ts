import {
  BaseHttpController,
  controller,
  httpGet,
  httpPatch,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/user/user.service';
import { NotificationService } from '@V1/notifications/notification.service';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
@controller('/v1/notifications', TYPES.AuthMiddleware)
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
  @httpPatch('/markAllRead', TYPES.VerifiedUserMiddleware)
  private async markAllRead() {
    const userId = (this.httpContext.user as VLAuthPrincipal).id;
    await this.notificationService.markAllRead(userId);
    return this.ok('Notifications marked Read');
  }
}
