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
import { UserService } from '@V1/user/user.service';
import { AuthService } from '@V1/auth/auth.service';
import { ContractService } from '@V1/contract/contracts.service';
import { NextFunction } from 'express';
import { BadRequestError } from '@Errors/BadRequest';
import { User } from '@V1/user/user.model';
@controller('/@TESTING', TYPES.TestingMiddleware)
export class TestingnController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.ContractService) private contractService: ContractService,
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
    return this.userService.findOrCreateUserByDiscord('0');
  }
  @httpPost('/users/verified')
  async createVerifiedUser(
    @queryParam('name') name: string = 'Verified User',
    @queryParam('id') id: number = 1,
  ) {
    const user = await this.userService.findOrCreateUserByDiscord(
      id.toString(),
    );
    if (user.verified == false) {
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
      throw nextFunction(
        new BadRequestError('Missing Query', 'bad_query', 'id'),
      );
    return this.authService.signUser(userId);
  }
}
