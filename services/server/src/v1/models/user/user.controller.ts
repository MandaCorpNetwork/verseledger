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
import { UserService } from '@V1/models/user/user.service';
import { AuthService } from '@V1/models/auth/auth.service';
import { VLAuthPrincipal } from '@AuthProviders/VL.principal';
import { ContractService } from '@V1/models/contract/contract.service';
import { NextFunction } from 'express';
import { NetworkError } from '@V1/errors/NetworkError';
import { IdPrefix, IdUtil } from '@Utils/IdUtil';
import { BadRequestError } from '@V1/errors/BadRequest';
import { ApiOperationGet, ApiPath } from 'swagger-express-ts';
import { Logger } from '@Utils/Logger';
import { UserBidsSearchSchema } from 'vl-shared/src/schemas/SearchSchema';
import { GenericError } from '@V1/errors/GenericError';
import { z, ZodError } from 'zod';
import { UserToUserDTOMapper } from './mapping/UserToUserDTO.mapper';
import { stringArray } from 'vl-shared/src/utils/stringArray';

@ApiPath({
  path: '/v1/users',
  name: 'Users',
  description: 'User Searching',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/users')
export class UsersController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.AuthService) private readonly authService: AuthService,
    @inject(TYPES.ContractService)
    private readonly contractService: ContractService,
  ) {
    super();
  }

  @ApiOperationGet({
    description: 'Get a User',
    summary: 'Get a User',
    path: '/{userId}',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        userId: { required: true, description: 'A User ID', type: 'string' },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet(
    `/:id(${IdUtil.expressRegex(IdPrefix.User)})`,
    TYPES.VerifiedUserMiddleware,
  )
  public async getUser(
    @requestParam('id') id: string,
    @queryParam('scope') scope?: string[],
  ) {
    const scopes = stringArray(z.enum(['profile', 'orgs']))
      .optional()
      .parse(scope);
    const user = await this.userService.getUser(id, scopes);
    if (user == null) return this.notFound();
    return UserToUserDTOMapper.map(user);
  }

  @ApiOperationGet({
    description: 'Get Current User',
    summary: 'Get Current User',
    path: '/@me',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {},
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet('/@me', TYPES.AuthMiddleware)
  public async getSelf() {
    const principal = this.httpContext.user as VLAuthPrincipal;
    const user = await this.userService.getUser(principal.id, [
      'settings',
      'orgs',
    ]);
    if (user == null) return this.notFound();
    return UserToUserDTOMapper.map(user);
  }

  @ApiOperationGet({
    deprecated: true,
    description: 'Get all Users',
    summary: 'Get all Users',
    path: '/',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        locationId: {
          required: true,
          description: 'A Location ID',
          type: 'string',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet('/', TYPES.VerifiedUserMiddleware)
  public async findUsers(@queryParam('handle') handle: string) {
    //if (handle == null || handle.trim() == '') return this.badRequest();
    return (await this.userService.findUsers(handle)).map((u) =>
      UserToUserDTOMapper.map(u),
    );
  }

  @httpGet('/validate', TYPES.AuthMiddleware)
  public async getValidationToken(@next() nextFunc: NextFunction) {
    const principal = this.httpContext.user as VLAuthPrincipal;
    const valid = await this.userService.getValidationToken(principal.id);
    if (valid == null)
      return nextFunc(new NetworkError(404, 'No Validation Token'));
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
      Logger.error(error);
      return nextFunc(error);
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
      Logger.error(error);
      return nextFunc(error);
    }
  }

  @httpPost('/validate/check')
  public async validateUserCheck(@next() nextFunc: NextFunction) {
    const principal = this.httpContext.user as VLAuthPrincipal;
    try {
      const user = await this.userService.validateUser(principal.id);
      return UserToUserDTOMapper.map(user);
    } catch (error) {
      Logger.error(error);
      nextFunc(error);
    }
  }

  @ApiOperationGet({
    description: 'Search Users',
    summary: 'Search Users',
    path: '/search',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      query: {
        q: {
          type: 'string',
          required: true,
          description: 'User Handle or Name. Handles must prefix with "@"',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet('/search', TYPES.VerifiedUserMiddleware)
  public async search(
    @queryParam('q') search: string,
    @next() nextFunc: NextFunction,
  ) {
    if (search == null || search.trim() == '')
      return nextFunc(new BadRequestError('"q" can not be Empty'));
    return (await this.userService.search(search)).map((u) =>
      UserToUserDTOMapper.map(u),
    );
  }

  @httpGet(
    `/:id(${IdUtil.expressRegex(IdPrefix.User)}|@me)/bids`,
    TYPES.VerifiedUserMiddleware,
  )
  public async getUserBids(
    @requestParam('id') userId: string,
    @next() nextFunc: NextFunction,
    @queryParam('search') searchRaw?: unknown,
  ) {
    let userRaw: string | null;
    let search: ReturnType<(typeof UserBidsSearchSchema)['parse']>;
    if (userId === '@me') {
      const principal = this.httpContext.user as VLAuthPrincipal;
      userRaw = principal.id;
    } else {
      userRaw = userId;
    }
    const user = userRaw;
    if (user == null) return this.notFound();

    try {
      search = UserBidsSearchSchema.strict().optional().parse(searchRaw)!;
    } catch (error) {
      Logger.error(error);
      return nextFunc(new GenericError(400, (error as ZodError).issues));
    }

    const bidInfo = await this.userService.getUserBids(user, search);
    const bids = bidInfo.rows;
    const limit = Math.min(25, search.limit ?? 10);
    const page = search.page ?? 0;
    const response = {
      search,
      pages: {
        total: bidInfo.count,
        limit,
        page: page + 1,
        pages: Math.ceil(bidInfo.count / limit),
      },
      data: bids,
    };
    return response;
  }
}
