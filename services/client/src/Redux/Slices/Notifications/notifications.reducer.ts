import { createSlice } from '@reduxjs/toolkit';
import { IDTOComplete, ITimestamped } from 'vl-shared/src/schemas/DTOSchema';
import { INotificationDisplay } from 'vl-shared/src/schemas/NotificationSchema';

import { fetchNotifications } from './actions/getNotifications';
import { fetchUnreadCount } from './actions/getUnreadCount';
import { markAllRead } from './actions/markAllRead';
import { markRead } from './actions/patchMarkRead';

const notificationsReducer = createSlice({
  name: 'notifications',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {
    unreadNotifications: 0,
    notificationsMap: {} as Record<
      string,
      IDTOComplete<ITimestamped<INotificationDisplay>>
    >,
  },
  reducers: {
    noop() {
      return { unreadNotifications: 0, notificationsMap: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnreadCount.fulfilled, (_state, action) => {
        _state.unreadNotifications = (action.payload as { unread: number }).unread;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const notifications = action.payload;
        state.notificationsMap = {};
        for (const notif of notifications) {
          state.notificationsMap[notif.id] = notif;
        }
      })
      .addCase(markRead.fulfilled, (state, action) => {
        const notificationId = action.meta.arg;
        if (state.notificationsMap[notificationId]) {
          delete state.notificationsMap[notificationId];
          state.unreadNotifications -= 1;
        }
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.notificationsMap = {};
        state.unreadNotifications = 0;
      });
  },
});

export default notificationsReducer;
export const actions = notificationsReducer.actions;
