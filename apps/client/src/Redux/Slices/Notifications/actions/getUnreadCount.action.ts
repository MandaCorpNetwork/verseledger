import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

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
