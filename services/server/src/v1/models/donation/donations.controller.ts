import { BaseHttpController, controller } from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/models/user/user.service';
import { PallyService } from '@V1/services/pally.service';

@controller('/v1/donations')
export class DonationController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.PallyService) private pallyService: PallyService,
  ) {
    super();
  }
}
