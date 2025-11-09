import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const fetchUnreadCount = createAsyncThunk(
  'GET /notifications/unreadCount',
  async () => {
    const response = await NetworkService.GET(
      '/notifications/unreadCount',
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
