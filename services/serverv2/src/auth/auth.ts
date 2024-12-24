import { Header, Gateway, Query, APIError, api } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import jwt from 'jsonwebtoken';
import { secret } from 'encore.dev/config';
import { auth, user } from '~encore/clients';
import { AuthDB } from '../auth-database/database';
import { userLogin } from '../user/user';
interface AuthParams {
  authHeader?: Header<'Authorization'>;
  apiKey?: Header<'X-API-Key'>;
  apiQuery?: Query<'api_key'>;
}

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
    const row = await AuthDB.queryRow`
    UPDATE
      api_tokens t
    SET
      last_used_at = ${new Date(Date.now())}
    WHERE
      token_id = ${userAuth.jti}
    AND
      user_id = ${userAuth.id}
    AND
      type = ${userAuth.type}
    AND
      expires_at >= ${new Date(Date.now())}
    RETURNING t.*
    `;
    if (row == null) throw APIError.unauthenticated('invalid credentials');
    return userAuth;
  },
);

//#region Endpoints

const DISCORD_CLIENT_ID = secret('DISCORD_CLIENT_ID');
const FRONTEND_HOST = secret('FRONTEND_HOST');
const DISCORD_CLIENT_SECRET = secret('DISCORD_CLIENT_SECRET');
interface LoginWithDiscordCMD {
  code: string;
}
interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}

export const loginWithDiscord = api(
  { method: 'POST', expose: false },
  async (params: LoginWithDiscordCMD): Promise<DiscordUser> => {
    const { code } = params;
    const body = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID(),
      client_secret: DISCORD_CLIENT_SECRET(),
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${FRONTEND_HOST()}/oauth/discord/callback`,
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
        return fetch(`https://discord.com/api/v10/users/@me`, {
          headers: { Authorization: `${token_type} ${access_token}` },
        })
          .then((r) => r.json())
          .then((user) => {
            return user as { id: string; username: string; avatar: string };
          });
      });
    return user;
  },
);

interface LoginWithServiceCMD {
  service: string;

  code: string;
}

/**
 * Login with a given service
 */
export const login = api(
  {
    expose: true,
    method: 'POST',
    auth: false,
    path: '/login/:service',
  },
  async (params: LoginWithServiceCMD) => {
    const service = params.service.toUpperCase();
    switch (service) {
      case 'DISCORD': {
        const loginResp = await auth.loginWithDiscord({ code: params.code });
        const login_user = await user.getOrCreateUser({
          user_id: loginResp.id,
          service,
        });
        console.log(login_user);
        userLogin.publish({ userId: login_user.id });
        return login_user;
      }
      default:
        throw APIError.unimplemented(`Login Method Not Available: ${service}`);
    }
  },
);

//#endRegion
//#region Gateway
// Define the API Gateway that will execute the auth handler:
export const gateway = new Gateway({
  authHandler: JWTAuthHandler,
});
