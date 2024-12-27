import { api, APIError } from 'encore.dev/api';
import { type User } from '../user/user';
import { users } from '~encore/clients';
import { getAuthData } from '~encore/auth';

export const whoami = api({ auth: true }, async (): Promise<User> => {
  const authData = getAuthData();
  const user = await users.get({ user_id: authData!.userID });
  if (user == null) throw APIError.notFound('User Not Found');
  return user;
});
