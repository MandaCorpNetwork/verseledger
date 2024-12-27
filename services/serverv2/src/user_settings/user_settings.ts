import { api } from 'encore.dev/api';
import { getAuthData } from '~encore/auth';
import { assertPermission } from '../auth/permissions';
import { ApiPermission } from '../auth/auth';
import { UserSettingsDB } from './database';

export const getUserSettings = api(
  { expose: true, auth: true, path: '/settings', method: 'GET' },
  async () => {
    const authRole = getAuthData()!;
    assertPermission(ApiPermission.USERSETTINGS_READ, authRole);
    const settings = UserSettingsDB.query`SELECT * FROM user_settings WHERE user_id = ${authRole.userID}`;
    console.log(settings);
  },
);

interface UpdateUserSettingCMD {
  id: string;
  key: string;
  value: string;
}
export const updateUserSetting = api(
  { expose: true, auth: true, path: '/settings', method: 'PUT' },
  async (_params: UpdateUserSettingCMD) => {
    const authRole = getAuthData()!;
    assertPermission(ApiPermission.USERSETTINGS_WRITE, authRole);
  },
);
