import { NotificationsActiveTwoTone, NotificationsOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react';

type NotificationIconProps = {
  notifOpen: boolean;
  notifCount: number;
};

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  notifCount,
  notifOpen,
}) => {
  const notificationIcon = notifOpen ? (
    <NotificationsActiveTwoTone />
  ) : notifCount > 0 ? (
    <NotificationsActiveTwoTone color="warning" />
  ) : (
    <NotificationsOutlined />
  );
  return (
    <Badge badgeContent={notifCount} color="error">
      {React.cloneElement(notificationIcon, {
        fontSize: 'large',
        className: 'User-Dial-Option',
      })}
    </Badge>
  );
};
