import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const markAllRead = createAsyncThunk('/notifications/read', async () => {
  const response = await NetworkService.GET(
    '/notifications/markAllRead',
    AuthUtil.getAccessHeader(),
  );
  return response.data;
});
