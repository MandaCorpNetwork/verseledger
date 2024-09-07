import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  next,
  requestBody,
  requestHeaders,
  requestParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/models/user/user.service';
import { AuthService } from '@V1/models/auth/auth.service';
import { EnvService } from '@V1/services/env.service';
import { NextFunction } from 'express';
import { UnauthorizedError } from '@V1/errors/UnauthorizedError';
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
} from 'swagger-express-ts';
import { Logger } from '@/utils/Logger';
import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { AuthRepository } from './auth.repository';
import { ApiTokenCreateSchema } from 'vl-shared/src/schemas/ApiTokenSchema';
import { NotificationService } from '../notifications/notification.service';
import { Notification } from '../notifications/notification.model';
const env = new EnvService();
@ApiPath({
  path: '/v1/auth',
  name: 'Auth',
  description: 'Auth Token related calls. Privilaged Use.',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/auth')
export class AuthController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.NotificationService)
    private notificationsService: NotificationService,
  ) {
    super();
  }

  @ApiOperationGet({
    tags: ['Auth'],
    description:
      'Get user api token identifiers. Actual tokens are never stored, and thus can not be retrieved after generation.',
    summary: 'Get user api token identifiers',
    path: '/tokens',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {},
    security: { VLBearerAuth: [] },
  })
  @httpGet('/tokens', TYPES.VerifiedUserMiddleware)
  public async getTokens() {
    const owner_id = (this.httpContext.user as VLAuthPrincipal).id;
    const tokens = AuthRepository.getTokens(owner_id);
    return tokens;
  }

  @ApiOperationDelete({
    tags: ['Auth'],
    description:
      'Delete an API token - Privilaged. Requests to this made with Access Tokens will 401',
    summary: 'Delete an API token - Privilaged',
    path: '/tokens/{token_id}',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: { token_id: { required: true, description: 'A Token ID' } },
    },
    security: { VLBearerAuth: [] },
  })
  @httpDelete('/tokens/:token_id', TYPES.VerifiedUserMiddleware)
  public async deleteTokens(@requestParam('token_id') token_id: string) {
    const user_id = (this.httpContext.user as VLAuthPrincipal).id;
    return AuthRepository.invalidateToken({ token_id, user_id });
  }

  @ApiOperationPost({
    tags: ['Auth'],
    description:
      'Create an API token - Privilaged. Requests to this made with Access Tokens will 401',
    summary: 'Create an API token - Privilaged',
    path: '/tokens',
    responses: {
      201: {
        type: 'Success',
        description: 'Created',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      body: {
        properties: {
          expires: { type: 'date | string', required: true },
          name: { type: 'string', required: true },
        },
        required: true,
      },
    },
    security: { VLBearerAuth: [] },
  })
  @httpPost('/tokens', TYPES.VerifiedUserMiddleware)
  public async createToken(
    @requestBody() reqBody: { expires: string; name: string },
  ) {
    const body = ApiTokenCreateSchema.strict().parse(reqBody);
    const owner_id = (this.httpContext.user as VLAuthPrincipal).id;
    const token = await this.authService.createApiToken(
      owner_id,
      body.expires as Date,
      body.name,
    );
    return this.created(`/v1/auth/tokens/${token.token_id}`, token);
  }

  @ApiOperationPost({
    tags: ['Auth'],
    description:
      'Refresh the Current User - Privilaged. Requests to this made with Access Tokens will 401',
    summary: 'Refresh the Current User - Privilaged',
    path: '/refresh',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {},
    security: { VLBearerAuth: [] },
  })
  @httpPost('/refresh', TYPES.AuthMiddleware)
  public async refreshHeaders(
    @requestHeaders('Authorization') authHeader: string,
    @next() nextFunc: NextFunction,
  ) {
    if (authHeader == null) {
      Logger.warn('No Headers');
      throw nextFunc(new UnauthorizedError());
    }
    const headerParts = authHeader.split(' ');
    if (headerParts.length != 2 || headerParts[0] !== 'Bearer') {
      throw nextFunc(new UnauthorizedError());
    }
    const token = headerParts[1];
    return this.authService.getUserToken(token).then(async (u) => {
      if (u == null) {
        throw nextFunc(new UnauthorizedError());
      }
      await this.authService.invalidateToken(token);
      return this.authService.signUser(u.id);
    });
  }

  @httpPost('/discord')
  public async loginWithDiscord(@requestBody() reqBody: { code: string }) {
    const body = new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: reqBody.code,
      //TODO: Wire up mode - STAGING
      //redirect_uri: 'https://stg.verseledger.net/oauth/discord/callback',
      redirect_uri: `http://localhost:3000/oauth/discord/callback`,
      scope: 'identify',
    });
    const user = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
    })
      .then((res) => res.json())
      .then((body) => {
        const { token_type, access_token } = body as {
          access_token: string;
          token_type: string;
        };
        Logger.info('ACCESS_TOKEN', access_token);
        return fetch(`https://discord.com/api/v10/users/@me`, {
          headers: { Authorization: `${token_type} ${access_token}` },
        })
          .then((r) => r.json())
          .then((user) => {
            return user as { id: string; username: string; avatar: string };
          });
      });
    const dbUser = await this.userService.findOrCreateUserByDiscord(user.id);
    if (dbUser.newUser) {
      await Notification.create({
        user_id: dbUser.user.id,
        text: '$VERIFY',
        resource: '$VERIFY',
      });
    }
    return this.authService.signUser(dbUser.user.id);
  }
}
