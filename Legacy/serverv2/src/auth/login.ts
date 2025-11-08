import { Header, Gateway, Query, APIError, api } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import jwt from 'jsonwebtoken';
import { secret } from 'encore.dev/config';
import { auth, users } from '~encore/clients';
import ms from 'ms';
import { userLogin } from '../user/user';
import { createId, IDPrefix } from '../utils/createId';
import { ApiPermission } from './permissions';
import { DTO } from '../utils/JSAPI';
import { Database } from '../database/database';
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
const AUTH_SECRET = secret('AUTH_SECRET');
// The auth handler itself.
export const JWTAuthHandler = authHandler<AuthParams, AuthData>(
  async (params) => {
    const bearer = params.authHeader ?? params.apiKey ?? params.apiQuery;
    if (bearer == null) throw APIError.unauthenticated('missing credentials');
    let token = bearer;
    if (bearer.startsWith('Bearer ')) token = bearer.slice('Bearer '.length);
    let userAuth: AuthData | null = null;
    try {
      userAuth = jwt.verify(
        token,
        Buffer.from(AUTH_SECRET().toString(), 'base64'),
        { algorithms: ['HS512'] },
      ) as AuthData;
    } catch (_e) {
      throw APIError.unauthenticated('Invalid Token');
    }
    if (userAuth == null)
      throw APIError.unauthenticated(
        'The request does not have valid authentication credentials for the operation.',
      );
    userAuth.userID = userAuth.id;
    const row = await Database.queryRow`
    UPDATE
      api_tokens t
    SET
      last_used_at = ${new Date(Date.now())}
    WHERE
      token_id = ${userAuth.jti}
    AND
      user_id = ${userAuth.id}
    AND
      token_type = ${userAuth.type}
    AND
      expires_at >= ${new Date(Date.now())}
    RETURNING t.*
    `;
    if (row == null)
      throw APIError.unauthenticated(
        'The request does not have valid authentication credentials for the operation.',
      );
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
    path: '/api/v2/auth/login/:service',
  },
  async (params: LoginWithServiceCMD): Promise<DTO<VLTokenPair>> => {
    const service = params.service.toLocaleLowerCase();
    switch (service) {
      case 'discord': {
        const loginResp = await auth.loginWithDiscord({ code: params.code });
        const login_user = await users.getOrCreate({
          user_id: loginResp.id,
          service,
        });
        userLogin.publish({ userId: login_user.id });
        return { data: await auth.createTokenPair({ user_id: login_user.id }) };
      }
      case 'google':
      default:
        throw APIError.unimplemented(`Login Method Not Available: ${service}`);
    }
  },
);

interface LoginMethod {
  type: string;
  redirect: string;
}

export const getServices = api(
  { expose: true, method: 'GET', auth: false, path: '/api/v2/auth/services' },
  async (): Promise<DTO<LoginMethod[]>> => {
    const methods = [
      {
        type: 'discord',
        redirect: `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(
          DISCORD_CLIENT_ID(),
        )}&response_type=code&redirect_uri=${encodeURIComponent(
          FRONTEND_HOST(),
        )}%2Foauth%2Fdiscord%2Fcallback&scope=openid`,
      },
    ];
    return { data: methods };
  },
);

interface CreateTokenPairCMD {
  user_id: string;
  jwtid?: string;
}
interface CreateTokenCMD {
  user_id: string;
  token_type: string;
  expires?: Date | number | string;
  roles?: string[];
  jwtid?: string;
  token_name?: string;
}

interface VLAuthToken {
  token: string;
  token_type: string;
  expires: Date;
}

interface VLTokenPair {
  access: VLAuthToken;
  refresh: VLAuthToken;
}
export const createTokenPair = api(
  {},
  async (params: CreateTokenPairCMD): Promise<VLTokenPair> => {
    const { jwtid = createId(IDPrefix.System), user_id } = params;
    const [access, refresh] = await Promise.all([
      auth.createToken({
        user_id: user_id,
        expires: '1h',
        token_type: 'access',
        roles: [ApiPermission.ADMIN],
        jwtid,
      }),
      auth.createToken({
        user_id: user_id,
        expires: '2d',
        token_type: 'refresh',
        roles: [ApiPermission.ADMIN],
        jwtid,
      }),
    ]);
    return {
      access,
      refresh,
    };
  },
);

export const createToken = api(
  {},
  async (params: CreateTokenCMD): Promise<VLAuthToken> => {
    const {
      token_name = 'USER TOKEN',
      token_type = 'access',
      user_id,
      expires = '1h',
      roles,
      jwtid = createId(IDPrefix.System),
    } = params;

    const expiresRange =
      typeof expires === 'string' ? ms(expires) : new Date(expires).getTime();
    const expiresAt = new Date(Date.now() + expiresRange);

    const tokenRaw = jwt.sign(
      { id: user_id, type: token_type, roles },
      Buffer.from(AUTH_SECRET().toString(), 'base64'),
      {
        algorithm: 'HS512',
        jwtid,
        audience: 'verseledger.net',
        issuer: 'api.verseledger.net',
        expiresIn: ms(expiresRange),
        subject: user_id,
      },
    );
    const id = createId(IDPrefix.System);
    await Database.exec`
    INSERT INTO api_tokens (id, user_id, token_id, token_type, token_name, expires_at, roles)
    VALUES
      (
        ${id},
        ${user_id},
        ${jwtid},
        ${token_type},
        ${token_name},
        ${expiresAt},
        ${roles ? JSON.stringify(roles) : JSON.stringify([])}
      );`;

    return { expires: expiresAt, token: tokenRaw, token_type };
  },
);

//#endRegion
//#region Gateway
// Define the API Gateway that will execute the auth handler:
export const gateway = new Gateway({
  authHandler: JWTAuthHandler,
});
