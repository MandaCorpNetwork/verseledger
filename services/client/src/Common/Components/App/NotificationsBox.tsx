import { Clear } from '@mui/icons-material';
import {
  Box,
  Button,
  CardHeader,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchNotifications } from '@Redux/Slices/Notifications/actions/getNotifications';
import { markAllRead } from '@Redux/Slices/Notifications/actions/markAllRead';
import { markRead } from '@Redux/Slices/Notifications/actions/patchMarkRead';
import { selectNotificationsArray } from '@Redux/Slices/Notifications/notificationSelectors';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';

import { NotificationContent } from '../Cards/NotificationContent';
import { NotificationsCard } from '../Cards/NotificationsCard';
import { AppbarListItem } from '../Lists/AppbarListItem';

export const NotificationsBox: React.FC = () => {
  const notifications = useAppSelector(selectNotificationsArray);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
    <NotificationsCard
      sx={{
        width: { sm: '100%', md: '450px' },
      }}
    >
      <CardHeader
        title="Notifications"
        sx={{
          textShadow: '0 0 5px rgba(255,255,255,.5), 0 0 2px rgba(0,9,16,.5)',
          alignItems: 'center',
        }}
        action={
          <Box sx={{ gap: '.5em' }}>
            <Button
              variant="text"
              size="small"
              color="secondary"
              onClick={() => {
                playSound('navigate');
                navigate('/ledger/personal/overview');
              }}
              disabled={location.pathname === '/ledger/personal/overview'}
            >
              <Typography variant="overline">Overview</Typography>
            </Button>
            <Button
              variant="text"
              size="small"
              color="secondary"
              onClick={handleMarkAllRead}
              disabled={notifications.length === 0}
            >
              <Typography variant="overline">Mark All Read</Typography>
            </Button>
          </Box>
        }
      />

      {notifications.length === 0 ? (
        <Typography
          align="center"
          variant="body1"
          sx={{
            fontWeight: 'bold',
            color: 'grey',
            textShadow: '0 0 2px rgba(0,0,0), 0 0 5px rgba(0,0,0,.8)',
            mb: '.2em',
          }}
        >
          No new notifications
        </Typography>
      ) : (
        <NotificationContent
          sx={{
            maxHeight: { sm: '100%', md: '450px' },
            mx: '.5em',
            mb: '.5em',
          }}
        >
          <List sx={{ listStyleType: 'disc', px: '.5em' }}>
            {notifications.map((notif) => {
              return (
                <AppbarListItem key={notif.id} sx={{ my: '.5em' }}>
                  <Tooltip title={notif.text} arrow>
                    <ListItemText
                      // primary={notifTitle(notif.resource)}
                      primaryTypographyProps={{
                        sx: {
                          color: 'text.primary',
                          textShadow: '0 0 5px rgba(255,255,255,.8)',
                        },
                      }}
                      secondary={notif.text}
                      sx={{ cursor: 'default', color: 'inherit' }}
                      secondaryTypographyProps={{
                        sx: {
                          textShadow: '0 0 5px rgba(255,255,255,.5)',
                          color: 'inherit',
                          fontSize: '.8em',
                        },
                        noWrap: true,
                      }}
                    />
                  </Tooltip>
                  <ListItemButton
                    onClick={() => handleViewNotification(notif.resource, notif.id)}
                  >
                    View
                  </ListItemButton>
                  <IconButton color="error" onClick={() => handleMarkRead(notif.id)}>
                    <Clear color="error" />
                  </IconButton>
                </AppbarListItem>
              );
            })}
          </List>
        </NotificationContent>
      )}
    </NotificationsCard>
  );
};
