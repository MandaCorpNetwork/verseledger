import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchNotifications } from '@Redux/Slices/Notifications/actions/getNotifications';
import { markRead } from '@Redux/Slices/Notifications/actions/patchMarkRead';
import { selectNotificationsArray } from '@Redux/Slices/Notifications/notificationSelectors';
import { parseResource } from '@Utils/notifResourceParse';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';

import { OverviewNotification } from './Notification';

export const NotificationTool: React.FC = () => {
  const notifications = useAppSelector(selectNotificationsArray);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playSound } = useSoundEffect();

  //TODO: Fetching Notifications

  //TODO: Marking ALL Notifications as Read
  const handleMarkAllRead = () => {};

  //TODO: Marking a singular Notification as Read
  const handleMarkRead = (notifyId: string) => {};

  //TODO: Navigating to items involving a notification.
  //Contract updates navigate to ContractPage for the Contract
  const handleViewNotification = (resource: string, notifyId: string) => {};

  //TODO: Displaying the Message of the Notification
  const notifTitle = React.useCallback((message: string) => {}, []);

  return (
    <GlassDisplay
      data-id="NotificationToolContent"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        padding: '1em',
        overflow: 'auto',
        height: { xs: '300px', md: '85%' },
      }}
    >
      {notifications.length === 0 && (
        <Typography align="center" sx={{ my: 'auto' }} variant="h6">
          No Notifications
        </Typography>
      )}
      {notifications.map((notif) => {
        return (
          <OverviewNotification
            key={notif.id}
            title="ToDo"
            // title={notifTitle(notif.resource)}
            text={notif.text}
            view={() => handleViewNotification(notif.resource, notif.id)}
            onClose={() => handleMarkRead(notif.id)}
          />
        );
      })}
    </GlassDisplay>
  );
};
