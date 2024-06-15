import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  next,
  queryParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@Services/user.service';
import { AuthService } from '@Services/auth.service';
import { ContractService } from '@Services/contracts.service';
import { NextFunction } from 'express';
import { BadRequestError } from '@Errors/BadRequest';
@controller('/@TESTING', TYPES.TestingMiddleware)
export class TestingnController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.ContractService) private contractService: ContractService,
  ) {
    super();
  }

  @httpPost('/users/unverified')
  async createUnverifiedUser() {
    return this.userService.findOrCreateUserByDiscord('0');
  }
  @httpPost('/users/verified')
  async createVerifiedUser() {
    const user = await this.userService.findOrCreateUserByDiscord('1');
    if (user.verified == false) {
      user.verified = true;
      user.displayName = 'Verified User';
      user.handle = 'verified_user';
      user.save();
    }
    return user;
  }
  @httpGet('/users/signed')
  async signUser(
    @queryParam('id') userId: string,
    @next() nextFunction: NextFunction,
  ) {
    if (userId == null)
      throw nextFunction(
        new BadRequestError('Missing Query', 'bad_query', 'id'),
      );
    return this.authService.signUser(userId);
  }
}
