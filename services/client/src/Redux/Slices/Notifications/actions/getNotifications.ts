import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const fetchNotifications = createAsyncThunk('GET /v1/notifications', async () => {
  const response = await NetworkService.GET(
    '/v1/notifications',
    AuthUtil.getAccessHeader(),
  );
  return response.data;
});
