import { Header, Gateway, Query, APIError, api } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import jwt from 'jsonwebtoken';
import { DB } from '../vl-database/vl-database';
import { assertPermission } from '../utils/permissions';
import { secret } from 'encore.dev/config';
import { auth } from "~encore/clients";
// AuthParams specifies the incoming request information
// the auth handler is interested in. In this case it only
// cares about requests that contain the `Authorization` header.
interface AuthParams {
  authHeader?: Header<'Authorization'>;
  apiKey?: Header<'X-API-Key'>;
  apiQuery?: Query<'api_key'>;
}

// The AuthData specifies the information about the authenticated user
// that the auth handler makes available.
interface AuthData {
  userID: string;
  jti: string;
  id: string;
  exp: number;
  type: 'access' | 'refresh' | 'api';
  roles: ApiPermission[];
}
export enum ApiPermission {
  ADMIN = 'ADMIN',
  VL_ADMIN = 'VLADMIN',
  CHAT = 'CHAT',
  CHAT_READ = 'CHAT_READ',
  CHAT_WRITE = 'CHAT_WRITE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  NOTIFICATIONS_READ = 'NOTIFICATIONS_READ',
  NOTIFICATIONS_WRITE = 'NOTIFICATIONS_WRITE',
  CONTRACT = 'CONTRACT',
  CONTRACT_READ = 'CONTRACT_READ',
  CONTRACT_WRITE = 'CONTRACT_WRITE',
  BID = 'BID',
  BID_READ = 'BID_READ',
  BID_WRITE = 'BID_WRITE',
  RATING = 'RATING',
  RATING_READ = 'RATING_READ',
  RATING_WRITE = 'RATING_WRITE',
  USER = 'USER',
  USER_READ = 'USER_READ',
  USER_WRITE = 'USER_WRITE',
  USERSETTINGS = 'USERSETTINGS',
  USERSETTINGS_READ = 'USERSETTINGS_READ',
  USERSETTINGS_WRITE = 'USERSETTINGS_WRITE',
  ORGS = 'ORGS',
  ORGS_READ = 'ORGS_READ',
  ORGS_WRITE = 'ORGS_WRITE',
  TOKEN = 'TOKEN',
  TOKEN_READ = 'TOKEN_READ',
  TOKEN_WRITE = 'TOKEN_WRITE',
}

const AUTH_SECRET = secret('AUTH_SECRET');
// The auth handler itself.
export const JWTAuthHandler = authHandler<AuthParams, AuthData>(
  async (params) => {
    const bearer = params.authHeader ?? params.apiKey ?? params.apiQuery;
    if (bearer == null) throw APIError.unauthenticated('missing credentials');
    let token = bearer;
    if (bearer.startsWith('Bearer ')) token = bearer.slice('Bearer '.length);
    const userAuth = jwt.verify(
      token,
      Buffer.from(AUTH_SECRET(), 'base64'),
    ) as AuthData;
    userAuth.userID = userAuth.id;
    const _row = await DB.queryRow`
    SELECT
      *
    FROM
      api_tokens
    WHERE
      user_id = ${userAuth.id}
    AND
      token_id = ${userAuth.jti}
    AND
      type = ${userAuth.type}
    AND
      expiresAt >= ${Date.now()}
    `;
    // TODO: Set up auth table
    //if (_row == null) throw APIError.unauthenticated('invalid credentials');
    return userAuth;
  },
);

// Define the API Gateway that will execute the auth handler:
export const gateway = new Gateway({
  authHandler: JWTAuthHandler,
});

export const test = api({ method: 'GET', path: '/', auth: true }, async () => {
  assertPermission(ApiPermission.USER);
});
const DISCORD_CLIENT_ID = secret('DISCORD_CLIENT_ID');
const DISCORD_CLIENT_SECRET = secret('DISCORD_CLIENT_SECRET');
interface LoginWithDiscordCMD {
  code: string;
}
export const loginWithDiscord = api(
  { method: 'POST', expose: false },
  async (params: LoginWithDiscordCMD) => {
    const { code } = params;
  },
);

interface LoginWithServiceCMD {
  service: string;

  code: string;
}

/**
 * Login with a given service
 */
export const loginWithService = api(
  {
    expose: true,
    method: 'POST',
    auth: false,
    path: '/login/:service',
  },
  async (params: LoginWithServiceCMD) => {
    const service = params.service;
    switch (service) {
      case 'discord': {
        const login = await auth.loginWithDiscord({ code: params.code });
        return { test: true }
        break;
      }
      default:
        throw APIError.unimplemented(`Login Method Not Available: ${service}`);
    }
  },
);
