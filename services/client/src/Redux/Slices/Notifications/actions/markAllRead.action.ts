import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const markAllRead = createAsyncThunk('/notifications/read', async () => {
  const response = await NetworkService.GET(
    '/v1/notifications/markAllRead',
    AuthUtil.getAccessHeader(),
  );
  return response.data;
});
