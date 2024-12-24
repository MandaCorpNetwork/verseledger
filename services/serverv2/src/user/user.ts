import { api } from 'encore.dev/api';
import { UserDB } from './user-database';
import { user } from '~encore/clients';
import { createId, IDPrefix } from '../utils/createId';
import { Topic } from 'encore.dev/pubsub';

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
interface GetOrCreateUserCMD {
  user_id: string;
  service: string;
}
interface CreateUserCMD {
  identifier: string;
  service: string;
}

export const getUser = api(
  { expose: true, method: 'GET', path: '/users/:user_id' },
  async (params: GetUserCMD): Promise<User> => {
    const row =
      await UserDB.queryRow`SELECT * FROM users WHERE id = ${params.user_id}`;
    return row as User;
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

export const getUserByAuth = api(
  {},
  async (params: GetUserByAuthCMD): Promise<UserAuthAttempt> => {
    const userAuth = (await UserDB.queryRow`
    SELECT
      *
    FROM
      user_auth
    WHERE
      identifier = ${params.identifier}
    AND
      type = ${params.type}
    `) as UserAuthEntry;
    if (userAuth == null) return { success: false };
    const user = await UserDB.queryRow`
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

export const createUser = api(
  { expose: false, method: 'POST' },
  async (params: CreateUserCMD): Promise<User> => {
    const newId = createId(IDPrefix.User);
    const tempHandle = createId(IDPrefix.User);
    const newUser = (await UserDB.queryRow`
    INSERT INTO users
      (id, handle, display_name, pfp)
    VALUES (${newId}, ${tempHandle}, 'Unverified User', 'https://cdn.robertsspaceindustries.com/static/spectrum/images/member-avatar-default.jpg')
    RETURNING *
    `) as User;
    await UserDB.exec`
    INSERT INTO user_auth
      (user_id, type, identifier)
    VALUES
      (${newUser.id}, ${params.service}, ${params.identifier})
    `;
    await userSignup.publish({ userId: newId });
    return newUser;
  },
);

export const getOrCreateUser = api(
  { expose: false },
  async (params: GetOrCreateUserCMD): Promise<User> => {
    const existingUser = await user.getUserByAuth({
      identifier: params.user_id,
      type: params.service,
    });
    if (existingUser.success) return existingUser.user!;
    const newUser = await user.createUser({
      identifier: params.user_id,
      service: params.service,
    });
    return newUser;
  },
);
