import { useSoundEffect } from '@Audio/AudioManager';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { ArrowRight } from '@mui/icons-material';
import { Collapse, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchNotifications } from '@Redux/Slices/Notifications/actions/getNotifications.action';
import { selectNotificationsArray } from '@Redux/Slices/Notifications/notifications.selectors';
import useNotification from '@Utils/Hooks/notificationHandler';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { INotificationDisplay } from 'vl-shared/src/schemas/NotificationSchema';

import { OverviewNotification } from './Notification';

export const NotificationTool: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState<string>('unread');
  const { handleMarkRead, handleViewNotification, getNotificationTitle } =
    useNotification();
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const { t } = useTranslation();
  React.useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const notifications = useAppSelector(selectNotificationsArray);

  const unreadNotifications = notifications.filter(
    (notif: INotificationDisplay) => !notif.read,
  );

  const readNotifications = notifications.filter(
    (notif: INotificationDisplay) => notif.read,
  );

  const handleExpand = React.useCallback(
    (value: string) => {
      if (isExpanded === value) {
        return sound.playSound('denied');
      }
      setIsExpanded(value);
    },
    [setIsExpanded, isExpanded, sound],
  );

  return (
    <FeatureDisplay
      data-id="NotificationToolContent"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1em',
        overflow: 'auto',
        height: { xs: '300px', md: '85%' },
      }}
    >
      <Typography
        variant="dropDown"
        onClick={() => handleExpand('unread')}
        sx={{ color: isExpanded === 'unread' ? 'secondary.main' : 'text.secondary' }}
      >
        Unread Notifications
        <ArrowRight
          color={isExpanded === 'unread' ? 'secondary' : 'inherit'}
          sx={{
            transform: isExpanded === 'unread' ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 150ms',
          }}
        />
      </Typography>
      <Collapse in={isExpanded === 'unread'} sx={{ gap: '1em' }}>
        {unreadNotifications.map((notif) => {
          return (
            <OverviewNotification
              key={notif.id}
              title={getNotificationTitle(notif)}
              text={t(notif.message, notif.action?.arguments) as string}
              view={() => handleViewNotification(notif)}
              onClose={() => handleMarkRead(notif.id)}
            />
          );
        })}
        {unreadNotifications.length === 0 && (
          <Typography
            align="center"
            sx={{ my: 'auto', color: 'grey', textShadow: '0 0 6px rgba(0,0,0)' }}
            variant="h6"
          >
            No Notifications
          </Typography>
        )}
      </Collapse>
      <Typography
        variant="dropDown"
        onClick={() => handleExpand('read')}
        sx={{ color: isExpanded === 'read' ? 'secondary.main' : 'text.secondary' }}
      >
        Read Notifications
        <ArrowRight
          color={isExpanded === 'read' ? 'secondary' : 'inherit'}
          sx={{
            transform: isExpanded === 'read' ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 150ms',
          }}
        />
      </Typography>
      <Collapse in={isExpanded === 'read'} sx={{ gap: '1em' }}>
        {readNotifications.map((notif) => {
          return (
            <OverviewNotification
              key={notif.id}
              title={getNotificationTitle(notif)}
              text={t(notif.message, notif.action?.arguments) as string}
              view={() => handleViewNotification(notif)}
              onClose={() => handleMarkRead(notif.id)}
            />
          );
        })}
        {readNotifications.length === 0 && (
          <Typography
            align="center"
            sx={{
              my: 'auto',
              color: 'grey',
              textShadow: '0 0 6px rgba(0,0,0)',
            }}
            variant="h6"
          >
            No Notifications
          </Typography>
        )}
      </Collapse>
    </FeatureDisplay>
  );
};

export default NotificationTool;
