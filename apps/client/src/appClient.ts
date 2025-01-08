import { AuthUtil } from '@Utils/AuthUtil';

import Client, { Local } from './client';

export const appClient = new Client(Local, {
  auth: () => {
    const token = AuthUtil.getAccessToken();
    if (token == null) return {};
    return { authHeader: `Bearer ${token}` };
  },
});
