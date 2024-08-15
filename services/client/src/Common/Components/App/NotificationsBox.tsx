import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchNotifications } from '@Redux/Slices/Notifications/actions/getNotifications';
import { selectNotificationsArray } from '@Redux/Slices/Notifications/notificationSelectors';
import React, { useEffect } from 'react';

export const NotificationsBox: React.FC = () => {
  const notifications = useAppSelector(selectNotificationsArray);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  return (
    <Card sx={{ width: { sm: '100%', md: '400px' } }}>
      <CardHeader
        title="Notifications"
        action={
          <Button variant="text" size="small">
            <Typography variant="subtitle2" color="secondary">
              Mark All Read
            </Typography>
          </Button>
        }
      />
      <CardContent
        sx={{
          maxHeight: '400px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(0,73,130)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(24,252,252)',
          },
        }}
      >
        <List sx={{ listStyleType: 'disc' }}>
          {notifications.map((notif) => {
            return (
              <ListItemButton key={notif.id}>
                <ListItemText primary={notif.text} />
              </ListItemButton>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
