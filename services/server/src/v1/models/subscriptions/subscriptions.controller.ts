import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { ApiPath } from 'swagger-express-ts';
import { SubscriptionService } from './subscriptions.service';
import { PushSubscription } from 'web-push';
import { BadRequestError } from '@V1/errors/BadRequest';
import { VLAuthPrincipal } from '@AuthProviders/VL.principal';

@ApiPath({
  path: '/v1/notifications',
  name: 'Notifications',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/subscriptions', TYPES.AuthMiddleware)
export class SubscriptionsController extends BaseHttpController {
  constructor(
    @inject(TYPES.SubscriptionService)
    private readonly subscriptionService: SubscriptionService,
  ) {
    super();
  }
  @httpGet('/public', TYPES.AuthMiddleware)
  private async getPublicKey() {
    if (!this.subscriptionService.initialized) return this.statusCode(503);
    return this.subscriptionService.getPublicKey();
  }
  @httpPost('/subscibe', TYPES.AuthMiddleware)
  private async subscribe(@requestBody() body: PushSubscription) {
    if (body?.endpoint == null) {
      return new BadRequestError(
        'Subscription must have an endpoint.',
        'no-endpoint',
      );
    }

    const user_id = (this.httpContext.user as VLAuthPrincipal).id;

    //! This will Change
    return await this.subscriptionService.subscribe(user_id, body);
  }
}
