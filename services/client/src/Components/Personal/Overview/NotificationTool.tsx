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

  React.useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  const handleMarkRead = (notifyId: string) => {
    playSound('close');
    dispatch(markRead(notifyId));
  };

  const handleViewNotification = (resource: string) => {
    const obj = parseResource(resource);
    if (obj) {
      if (obj.feature === 'contracts') {
        playSound('navigate');
        navigate(`contract?contractID=${obj.id}`);
      }
    } else {
      playSound('denied');
    }
  };

  const notifTitle = React.useCallback((resource: string) => {
    const obj = parseResource(resource);
    if (obj) {
      if (obj.feature === 'contracts') {
        return 'Contracts';
      }
    }
    return 'Unknown';
  }, []);
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
            title={notifTitle(notif.resource)}
            text={notif.text}
            view={() => handleViewNotification(notif.resource)}
            onClose={() => handleMarkRead(notif.id)}
          />
        );
      })}
    </GlassDisplay>
  );
};
