import {
  BaseHttpController,
  controller,
  httpPost,
  next,
  requestBody,
  requestHeaders,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/models/user/user.service';
import { AuthService } from '@V1/models/auth/auth.service';
import { EnvService } from '@/services/env.service';
import { NextFunction } from 'express';
import { UnauthorizedError } from '@Errors/UnauthorizedError';
import { ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { Logger } from '@/utils/Logger';
const env = new EnvService();
@ApiPath({
  path: '/v1/auth',
  name: 'Auth',
  security: { VLAuthAccessToken: [] },
})
@controller('/v1/auth')
export class AuthController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService,
  ) {
    super();
  }

  @ApiOperationPost({
    tags: ['Auth'],
    description: 'Refresh the Current User',
    summary: 'Refresh the Current User',
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
    security: { VLAuthRefreshToken: [] },
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
    return this.authService.signUser(dbUser.id);
  }
}
