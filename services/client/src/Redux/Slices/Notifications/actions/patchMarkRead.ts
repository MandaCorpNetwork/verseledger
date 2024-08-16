import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';

import NetworkService from '@/Services/NetworkService';

export const markRead = createAsyncThunk(
  `v1/notifications/markRead/:notificationId`,
  async (notificationId: string) => {
    try {
      const response = await NetworkService.PATCH(
        `/v1/notifications/markRead/${notificationId}`,
        notificationId,
        AuthUtil.getAccessHeader(),
      );
      return response.data;
    } catch (error) {
      Logger.error(`Client Error Marking Notification Read: ${error}`);
    }
  },
);
