import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
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
      <CardContent sx={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <List sx={{ listStyleType: 'disc' }}>
          {notifications.map((notif) => {
            return (
              <ListItem key={notif.id}>
                <ListItemText primary={notif.text} />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
