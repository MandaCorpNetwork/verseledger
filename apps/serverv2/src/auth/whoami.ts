import { api, APIError } from 'encore.dev/api';
import { type User } from '../user/user';
import { users } from '~encore/clients';
import { getAuthData } from '~encore/auth';
import { DTO } from '../utils/JSAPI';

export const whoami = api<void, DTO<User>>(
  { expose: true, auth: true },
  async () => {
    const authData = getAuthData();
    const user = await users.get({ user_id: authData!.userID });
    if (user == null) throw APIError.notFound('User Not Found');
    return user;
  },
);
