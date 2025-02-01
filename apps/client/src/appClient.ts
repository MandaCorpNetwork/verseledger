import { AuthUtil } from '@Utils/AuthUtil';
import { Client, Local } from '@verseledger-local/client';

export const appClient = new Client(Local, {
  auth: () => {
    const token = AuthUtil.getAccessToken();
    if (token == null) return {};
    return { authHeader: `Bearer ${token}` };
  },
});
