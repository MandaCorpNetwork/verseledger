import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  next,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@Services/user.service';
import { AuthService } from '@Services/auth.service';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { User } from '@/database/models/user.model';
import { Organization } from '@/database/models/organization.model';
import { OrganizationMember } from '@/database/models/organization_member.model';
import { PayStructure } from '@/interfaces/PayStructure';
import { ContractService } from '@Services/contracts.service';
import { NextFunction } from 'express';
import { NetworkError } from '@Errors/NetworkError';
import { IdPrefix, IdUtil } from '@/utils/IdUtil';
import { BadRequestError } from '@Errors/BadRequest';

@controller('/v1/users')
export class UsersController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.ContractService) private contractService: ContractService,
  ) {
    super();
  }

  @httpGet(
    `/:id(${IdUtil.expressRegex(IdPrefix.User)})`,
    TYPES.VerifiedUserMiddleware,
  )
  public async getUser(@requestParam('id') id: string) {
    const user = await this.userService.getUser(id);
    if (user == null) return this.notFound();
    return user;
  }

  @httpGet('/@me', TYPES.AuthMiddleware)
  public async getSelf() {
    const principal = this.httpContext.user as VLAuthPrincipal;
    const user = await this.userService.getUser(principal.id, ['discord']);
    if (user == null) return this.notFound();
    return user;
  }

  @httpGet('/new')
  public async createEmptyUser() {
    //if (handle == null || handle.trim() == '') return this.badRequest();
    const u = await User.create();
    const o = await Organization.create({
      title: 'Manda',
      rsi_handle: 'mandacorp',
      owner_id: u.id,
    });
    const c = await OrganizationMember.create({
      user_id: u.id,
      org_id: o.id,
      role: 'OWNER',
    });
    const oc = await this.contractService.createContract({
      title: 'orgContract',
      subtype: 'weeee',
      briefing: '',
      owner_id: o.id,
      bidDate: new Date(),
      ratingLimit: 0,
      payStructure: PayStructure.FLATRATE,
      defaultPay: 0,
      status: 'BIDDING',
    });
    const uc = await this.contractService.createContract({
      title: 'userContract',
      subtype: 'weeee',
      briefing: '',
      owner_id: u.id,
      bidDate: new Date(),
      ratingLimit: 0,
      payStructure: PayStructure.FLATRATE,
      defaultPay: 0,
      status: 'BIDDING',
    });
    return {
      user: u,
      org: o,
      membership: c,
      orgContract: oc,
      userContract: uc,
    };
  }

  @httpGet('/', TYPES.VerifiedUserMiddleware)
  public async findUsers(@queryParam('handle') handle: string) {
    //if (handle == null || handle.trim() == '') return this.badRequest();
    return await this.userService.findUsers(handle);
  }

  @httpGet('/validate', TYPES.AuthMiddleware)
  public async getValidationToken(@next() nextFunc: NextFunction) {
    const principal = this.httpContext.user as VLAuthPrincipal;
    const valid = await this.userService.getValidationToken(principal.id);
    if (valid == null)
      throw nextFunc(new NetworkError(404, 'No Validation Token'));
    return valid;
  }

  @httpPost('/validate', TYPES.AuthMiddleware)
  public async validateUser(
    @requestBody() body: { handle: string },
    @next() nextFunc: NextFunction,
  ) {
    const principal = this.httpContext.user as VLAuthPrincipal;
    try {
      const valid = await this.userService.createValidationToken(
        principal.id,
        body.handle,
      );
      return valid;
    } catch (error) {
      console.log(error);
      throw nextFunc(error);
    }
  }
  @httpDelete('/validate')
  public async validateUserClear(@next() nextFunc: NextFunction) {
    const principal = this.httpContext.user as VLAuthPrincipal;
    try {
      const valid = await this.userService.getValidationToken(principal.id);
      if (valid != null) await valid.destroy();
      return { deleted: valid != null };
    } catch (error) {
      console.log(error);
      throw nextFunc(error);
    }
  }
  @httpPost('/validate/check')
  public async validateUserCheck(@next() nextFunc: NextFunction) {
    const principal = this.httpContext.user as VLAuthPrincipal;
    try {
      const valid = await this.userService.validateUser(principal.id);
      return valid;
    } catch (error) {
      console.log(error);
      nextFunc(error);
    }
  }

  @httpGet('/search', TYPES.VerifiedUserMiddleware)
  public async search(@queryParam('handle') search: string) {
    if (search == null || search.trim() == '')
      throw new BadRequestError('"handle" can not be Empty');
    return this.userService.search(search);
  }
}
