import { BaseHttpController, controller } from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import type { UserService } from '@V1/models/user/user.service';
import type { PallyService } from '@V1/models/donation/pally.service';

@controller('/v1/donations')
export class DonationController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.PallyService) private readonly pallyService: PallyService,
  ) {
    super();
  }
}
