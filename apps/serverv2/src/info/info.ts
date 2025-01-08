import { AppMeta, appMeta } from 'encore.dev';
import { api } from 'encore.dev/api';

export const get = api<void, AppMeta>(
  { expose: true, path: '/api/v2/info', method: 'GET' },
  async () => {
    const meta = appMeta();
    return meta;
  },
);
