import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const markAllRead = createAsyncThunk('PATCH /v1/notifications/read', async () => {
  const response = await NetworkService.PATCH(
    '/v1/notifications/read',
    { id: '*' },
    AuthUtil.getAccessHeader(),
  );
  console.log(response.data);
  return response.data;
});
