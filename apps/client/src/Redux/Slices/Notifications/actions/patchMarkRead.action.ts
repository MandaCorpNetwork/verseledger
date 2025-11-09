import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const markRead = createAsyncThunk(
  `v1/notifications/:notificationId`,
  async (notificationId: string) => {
    const response = await NetworkService.PATCH(
      `/notifications/${notificationId}`,
      { read: true },
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
