import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { IDTOComplete, ITimestamped } from 'vl-shared/src/schemas/DTOSchema';
import type { INotificationDisplay } from 'vl-shared/src/schemas/NotificationSchema';

export const fetchNotifications = createAsyncThunk(
  'GET /notifications',
  async (unreadOnly?: boolean) => {
    const response = await NetworkService.GET<
      IDTOComplete<ITimestamped<INotificationDisplay>>[]
    >(`/notifications?unreadOnly=${unreadOnly ?? false}`, AuthUtil.getAccessHeader());
    return response.data;
  },
);
