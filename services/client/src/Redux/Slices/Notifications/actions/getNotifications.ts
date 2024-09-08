import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { IDTOComplete, ITimestamped } from 'vl-shared/src/schemas/DTOSchema';
import { INotificationDisplay } from 'vl-shared/src/schemas/NotificationSchema';

import NetworkService from '@/Services/NetworkService';

export const fetchNotifications = createAsyncThunk('GET /v1/notifications', async () => {
  const response = await NetworkService.GET<
    IDTOComplete<ITimestamped<INotificationDisplay>>[]
  >('/v1/notifications', AuthUtil.getAccessHeader());
  return response.data;
});
