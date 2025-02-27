import { api, APIError, Query } from 'encore.dev/api';
import { auth, users } from '~encore/clients';
import { createId, IDPrefix } from '../utils/createId';
import { Topic } from 'encore.dev/pubsub';
import { DTO } from '../utils/JSAPI';
import { Database } from '../database/database';

export interface NewUserEvent {
  userId: string;
}
export interface UserLoginEvent {
  userId: string;
}

export const userSignup = new Topic<NewUserEvent>('new-user', {
  deliveryGuarantee: 'exactly-once',
});
export const userLogin = new Topic<UserLoginEvent>('user-login', {
  deliveryGuarantee: 'exactly-once',
});

export interface User {
  id: string;
  handle: string;
  display_name: string;
  pfp: string;
  verified: boolean;
  total_ratings: number;
  weighted_rating: number;
  display_rating: number;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
}

interface GetUserCMD {
  user_id: string;
}
interface CreateUserCMD {
  identifier: string;
  service: string;
}

export const get = api<GetUserCMD, DTO<User>>(
  { expose: true, method: 'GET', path: '/api/v2/users/:user_id' },
  async (params): Promise<DTO<User>> => {
    if (params.user_id === '@me') return auth.whoami();
    const row =
      await Database.queryRow`SELECT * FROM users WHERE id = ${params.user_id}`;
    if (row == null) throw APIError.notFound('User not found');
    return { data: row as User };
  },
);

interface GetUserByAuthCMD {
  identifier: string;
  type: string;
}
export interface UserAuthEntry {
  id: string;
  user_id: string;
  type: string;
  identifier: string;
}

interface UserAuthAttempt {
  success: boolean;
  user?: User;
}

export const getByAuth = api<GetUserByAuthCMD, UserAuthAttempt>(
  {},
  async (params) => {
    const userAuth = (await Database.queryRow`
    SELECT
      *
    FROM
      user_auth
    WHERE
      identifier = ${params.identifier}
    AND
      token_type = ${params.type}
    `) as UserAuthEntry;
    if (userAuth == null) return { success: false };
    const user = await Database.queryRow`
  SELECT
    *
  FROM
    users
  WHERE
    id = ${userAuth.user_id}
  `;
    return { success: true, user: user as User };
  },
);

export const create = api<CreateUserCMD, User>(
  { expose: false, method: 'POST' },
  async (params) => {
    const newId = createId(IDPrefix.User);
    const tempHandle = createId(IDPrefix.User);
    const newUser = (await Database.queryRow`
    INSERT INTO users
      (id, handle, display_name, pfp)
    VALUES (${newId}, ${tempHandle}, 'Unverified User', 'https://cdn.robertsspaceindustries.com/static/spectrum/images/member-avatar-default.jpg')
    RETURNING *
    `) as User;
    await Database.exec`
    INSERT INTO user_auth
      (user_id, token_type, identifier)
    VALUES
      (${newUser.id}, ${params.service.toUpperCase()}, ${params.identifier})
    `;
    await userSignup.publish({ userId: newId });
    return newUser;
  },
);

interface GetOrCreateUserCMD {
  user_id: string;
  service: string;
}
export const getOrCreate = api<GetOrCreateUserCMD, User>(
  { expose: false },
  async (params) => {
    const existingUser = await users.getByAuth({
      identifier: params.user_id,
      type: params.service,
    });
    if (existingUser.success) return existingUser.user!;
    const newUser = await users.create({
      identifier: params.user_id,
      service: params.service,
    });
    return newUser;
  },
);

interface FindUsersCMD {
  // Term to Search
  query?: Query<string>;
}
export const find = api<FindUsersCMD, DTO<User[]>>(
  { method: 'GET', expose: true, path: '/api/v2/users' },
  async (params) => {
    const { query } = params;
    if (query == null || query.trim() === '')
      throw APIError.invalidArgument("Invalid 'query'");
    const usersGen = Database.query`SELECT * FROM users WHERE handle ILIKE ${'%' + query + '%'} OR display_name ILIKE ${'%' + query + '%'} LIMIT 99999`;
    const data = (await Array.fromAsync(usersGen)) as User[];
    return { data };
  },
);
