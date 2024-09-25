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
import { IdUtil } from '@/utils/IdUtil';

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

  @httpGet('/rabbitmq/.well-known/openid-configuration')
  private getOpenID() {
    return {
      issuer: 'https://server.example.com',
      authorization_endpoint: 'https://server.example.com/connect/authorize',
      token_endpoint: 'https://server.example.com/connect/token',
      token_endpoint_auth_methods_supported: [
        'client_secret_basic',
        'private_key_jwt',
      ],
      token_endpoint_auth_signing_alg_values_supported: ['RS256', 'ES256'],
      userinfo_endpoint: 'https://server.example.com/connect/userinfo',
      check_session_iframe: 'https://server.example.com/connect/check_session',
      end_session_endpoint: 'https://server.example.com/connect/end_session',
      jwks_uri: 'https://server.example.com/jwks.json',
      registration_endpoint: 'https://server.example.com/connect/register',
      scopes_supported: [
        'openid',
        'profile',
        'email',
        'address',
        'phone',
        'offline_access',
      ],
      response_types_supported: [
        'code',
        'code id_token',
        'id_token',
        'id_token token',
      ],
      acr_values_supported: [
        'urn:mace:incommon:iap:silver',
        'urn:mace:incommon:iap:bronze',
      ],
      subject_types_supported: ['public', 'pairwise'],
      userinfo_signing_alg_values_supported: ['RS256', 'ES256', 'HS256'],
      userinfo_encryption_alg_values_supported: ['RSA-OAEP-256', 'A128KW'],
      userinfo_encryption_enc_values_supported: ['A128CBC-HS256', 'A128GCM'],
      id_token_signing_alg_values_supported: ['RS256', 'ES256', 'HS256'],
      id_token_encryption_alg_values_supported: ['RSA-OAEP-256', 'A128KW'],
      id_token_encryption_enc_values_supported: ['A128CBC-HS256', 'A128GCM'],
      request_object_signing_alg_values_supported: ['none', 'RS256', 'ES256'],
      display_values_supported: ['page', 'popup'],
      claim_types_supported: ['normal', 'distributed'],
      claims_supported: [
        'sub',
        'iss',
        'auth_time',
        'acr',
        'name',
        'given_name',
        'family_name',
        'nickname',
        'profile',
        'picture',
        'website',
        'email',
        'email_verified',
        'locale',
        'zoneinfo',
        'http://example.info/claims/groups',
      ],
      claims_parameter_supported: true,
      service_documentation:
        'http://server.example.com/connect/service_documentation.html',
      ui_locales_supported: ['en-US', 'en-GB', 'en-CA', 'fr-FR', 'fr-CA'],
    };
  }

  @ApiOperationGet({
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
    security: { VLBearerAuth: [] },
  })
  @httpGet('/tokens', TYPES.VerifiedUserMiddleware)
  public async getTokens() {
    const owner_id = (this.httpContext.user as VLAuthPrincipal).id;
    const tokens = AuthRepository.getTokens(owner_id);
    return tokens;
  }

  @ApiOperationDelete({
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
    parameters: {
      path: {
        token_id: { required: true, description: 'A Token ID', type: 'string' },
      },
    },
    security: { VLBearerAuth: [] },
  })
  @httpDelete(
    `/tokens/:token_id(${IdUtil.expressRegex(IdUtil.IdPrefix.System)})`,
    TYPES.VerifiedUserMiddleware,
  )
  public async deleteTokens(@requestParam('token_id') token_id: string) {
    const user_id = (this.httpContext.user as VLAuthPrincipal).id;
    return AuthRepository.invalidateToken({ token_id, user_id });
  }

  @httpGet('/login')
  private async getLoginMethods() {
    return [
      env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET
        ? {
            type: 'discord',
            redirect: `https://discord.com/oauth2/authorize?client_id=1160393986440179823&response_type=code&redirect_uri=${encodeURIComponent(env.FRONTEND_HOST)}%2Foauth%2Fdiscord%2Fcallback&scope=identify+openid`,
          }
        : undefined,
      env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
        ? {
            type: 'google',
            redirect: `https://accounts.google.com/o/oauth2/auth?client_id=1034763283033-6ievnkrq0noh091rhj1nc7qlp4ulk0ap.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(env.FRONTEND_HOST)}%2Foauth%2Fgoogle%2Fcallback&scope=openid&response_type=code`,
          }
        : undefined,
    ].filter((a) => a);
  }

  @ApiOperationPost({
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
          expires: { type: 'string', required: true },
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
      body.roles,
    );
    return this.created(`/v1/auth/tokens/${token.token_id}`, token);
  }

  @ApiOperationPost({
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
      redirect_uri: `${env.FRONTEND_HOST}/oauth/discord/callback`,
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
    const dbUser = await this.userService.findOrCreateUser(user.id, 'DISCORD');
    if (dbUser.newUser) {
      await this.notificationsService.createNotification(
        dbUser.user.getDataValue('id'),
        '@NOTIFICATION.MESSAGES.VERIFY_RSI',
        { type: 'popup', popup: '$VERIFY' },
      );
    }
    return this.authService.signUser(dbUser.user.id);
  }

  @httpPost('/google')
  public async loginWithGoogle(@requestBody() reqBody: { code: string }) {
    const body = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: reqBody.code,
      //TODO: Wire up mode - STAGING
      redirect_uri: `${env.FRONTEND_HOST}/oauth/google/callback`,
      scope: 'openid',
    });
    const user = await fetch('https://oauth2.googleapis.com/token', {
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
        return fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `${token_type} ${access_token}` },
        })
          .then((r) => r.json())
          .then((user) => {
            return {
              id: (user as { sub: string }).sub,
              avatar: (user as { picture: string }).picture,
            } as { id: string; avatar: string };
          });
      });
    const dbUser = await this.userService.findOrCreateUser(user.id, 'GOOGLE');
    if (dbUser.newUser) {
      await this.notificationsService.createNotification(
        dbUser.user.getDataValue('id'),
        '@NOTIFICATION.MESSAGES.VERIFY_RSI',
        { type: 'popup', popup: '$VERIFY' },
      );
    }
    return this.authService.signUser(dbUser.user.id);
  }
}
