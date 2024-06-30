import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const fetchUnreadCount = createAsyncThunk(
  'GET /v1/notifications/unreadCount',
  async () => {
    const response = await NetworkService.GET(
      '/v1/notifications/unreadCount',
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
