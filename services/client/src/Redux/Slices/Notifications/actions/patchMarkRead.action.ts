import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const markRead = createAsyncThunk(
  `v1/notifications/:notificationId`,
  async (notificationId: string) => {
    const response = await NetworkService.PATCH(
      `/v1/notifications/${notificationId}`,
      { read: true },
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
