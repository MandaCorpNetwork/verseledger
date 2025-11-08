import { api } from 'encore.dev/api';
import { getAuthData } from '~encore/auth';
import { assertPermission, ApiPermission } from '../auth/permissions';
import { Database } from '../database/database';

export const get = api<void, void>(
  { expose: true, auth: true, path: '/api/v2/settings', method: 'GET' },
  async () => {
    const authRole = getAuthData()!;
    assertPermission(ApiPermission.USERSETTINGS_READ, authRole);
    const settings = Database.query`SELECT * FROM user_settings WHERE user_id = ${authRole.userID}`;
    console.log(settings);
  },
);

interface UpdateUserSettingCMD {
  id: string;
  key: string;
  value: string;
}
export const update = api<UpdateUserSettingCMD, void>(
  { expose: true, auth: true, path: '/api/v2/settings', method: 'PUT' },
  async (_params) => {
    const authRole = getAuthData()!;
    assertPermission(ApiPermission.USERSETTINGS_WRITE, authRole);
  },
);
