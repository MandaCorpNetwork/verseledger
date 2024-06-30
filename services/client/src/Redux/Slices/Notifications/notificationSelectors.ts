import type { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectNotificationsObject = (state: RootState) => {
  return state.notifications;
};
export const selectNotificationsUnreadCount = createSelector(
  [selectNotificationsObject],
  (notificationsObject) => {
    return notificationsObject.unreadNotifications ?? 0;
  },
);
export const selectNotificationsArray = createSelector(
  [selectNotificationsObject],
  (notificationsObject) => {
    return Object.values(notificationsObject.notificationsMap).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },
);
