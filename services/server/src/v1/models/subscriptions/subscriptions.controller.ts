import {
  BaseHttpController,
  controller,
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
import { Subscription } from './subscription.model';

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
  @httpPost('/subscibe', TYPES.AuthMiddleware)
  private async subscribe(@requestBody() body: PushSubscription) {
    if (body?.endpoint == null) {
      return new BadRequestError(
        'Subscription must have an endpoint.',
        'no-endpoint',
      );
    }

    const user_id = (this.httpContext.user as VLAuthPrincipal).id;
    const sub = {
      user_id,
      ...Subscription.format(body),
    };
    const newSub = await Subscription.create(sub);
    return newSub.id;
  }
}
