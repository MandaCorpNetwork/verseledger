import { AppMeta, appMeta } from 'encore.dev';
import { api } from 'encore.dev/api';

export const get = api(
  { expose: true, path: '/api/v2/info', method: 'GET' },
  async (): Promise<AppMeta> => {
    const meta = appMeta();
    return meta;
  },
);
