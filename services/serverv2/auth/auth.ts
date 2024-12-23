import { Header, Gateway, Query, APIError } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import jwt from 'jsonwebtoken';
import { DB } from '../vl-database/vl-database';

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

// The auth handler itself.
export const JWTAuthHandler = authHandler<AuthParams, AuthData>(
  async (params) => {
    const bearer = params.authHeader ?? params.apiKey ?? params.apiQuery;
    if (bearer == null) throw APIError.unauthenticated('missing credentials');
    let token = bearer;
    if (bearer.startsWith('Bearer ')) token = bearer.slice('Bearer '.length);
    const userAuth = jwt.verify(
      token,
      Buffer.from(
        'MVEDNHGWvrz+bZQ5Co8+aRlw0ZhVW+aqMiSkzn8Y+NhG5Y+IB+dBcDTSWO4Iigrarhvx8lSAn6U42dZbfBWwbFZ1WHkxZwXIzpGKz6Iygf+LIXIGWu37qEECHfwbu7CKoL8YMqBwoJNNeBQaZrXll3HLqUHVfk47va2Dz9Dfd4MRh7XkM+uoS1Z2Q8ysNNa+7HdfTkbjN1ypo1ZNxvdiUPPcDP7YWcCZCqPhzw==',
        'base64',
      ),
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
