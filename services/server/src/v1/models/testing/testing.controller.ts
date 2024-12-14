import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  next,
  queryParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import type { UserService } from '@V1/models/user/user.service';
import type { AuthService } from '@V1/models/auth/auth.service';
import type { ContractService } from '@V1/models/contract/contract.service';
import type { NextFunction } from 'express';
import { BadRequestError } from '@V1/errors/BadRequest';
import { User } from '@V1/models/user/user.model';
@controller('/@TESTING', TYPES.TestingMiddleware)
export class TestingnController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.AuthService) private readonly authService: AuthService,
    @inject(TYPES.ContractService)
    private readonly contractService: ContractService,
  ) {
    super();
  }

  @httpDelete('/users')
  async wipeUsers() {
    await User.destroy({ where: {} });
    return this.ok();
  }

  @httpPost('/users/unverified')
  async createUnverifiedUser() {
    return this.userService.findOrCreateUser('0', 'DISCORD');
  }
  @httpPost('/users/verified')
  async createVerifiedUser(
    @queryParam('name') name: string = 'Verified User',
    @queryParam('id') id: number = 1,
  ) {
    const { user } = await this.userService.findOrCreateUser(
      id.toString(),
      'DISCORD',
    );
    if (!user.verified) {
      user.verified = true;
      user.displayName = name;
      user.handle = name.toLowerCase().replaceAll(' ', '_');
      user.save();
    }
    if (user.isNewRecord) this.statusCode(201);
    return user;
  }
  @httpGet('/users/signed')
  async signUser(
    @queryParam('id') userId: string,
    @next() nextFunction: NextFunction,
  ) {
    if (userId == null)
      return nextFunction(
        new BadRequestError('Missing Query', 'bad_query', 'id'),
      );
    return this.authService.signUser(userId);
  }
}
