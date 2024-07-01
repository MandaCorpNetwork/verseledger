import { createSlice } from '@reduxjs/toolkit';

import { fetchNotifications } from './actions/getNotifications';
import { fetchUnreadCount } from './actions/getUnreadCount';

const notificationsReducer = createSlice({
  name: 'notifications',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {
    unreadNotifications: 0,
    notificationsMap: {} as Record<string, { id: string; text: string; createdAt: Date }>,
  },
  reducers: {
    noop() {
      return { unreadNotifications: 0, notificationsMap: {} };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnreadCount.fulfilled, (_state, action) => {
      _state.unreadNotifications = (action.payload as { unread: number }).unread;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const notifications = action.payload as {
        id: string;
        text: string;
        createdAt: Date;
      }[];
      state.notificationsMap = {};
      for (const notif of notifications) {
        state.notificationsMap[notif.id] = notif;
      }
    });
  },
});

export default notificationsReducer;
export const actions = notificationsReducer.actions;
