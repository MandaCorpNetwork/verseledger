import { Clear } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
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
import { selectNotificationsArray } from '@Redux/Slices/Notifications/notificationSelectors';
import React, { useEffect } from 'react';

import { AppbarListItem } from '../Lists/AppbarListItem';

export const NotificationsBox: React.FC = () => {
  const notifications = useAppSelector(selectNotificationsArray);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);
  return (
    <Card
      sx={{
        width: { sm: '100%', md: '450px' },
        boxShadow:
          '0 1px 2px rgba(33,150,243,.4), 0 2px 4px rgba(33,150,243,.3), 0 4px 8px rgba(33,150,243,.2), 0 8px 16px rgba(33,150,243,.1), 0 16px 32px rgba(0,9,16,.05), inset 0 1px 2px rgba(0,9,16,.05), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05), inset 0 8px 16px rgba(0,9,16,.05), inset 0 16px 32px rgba(0,9,16,.05)',
        position: 'relative',
        background:
          'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '5px 5px',
          opacity: 0.3,
          zIndex: -1,
        },
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
            <Button variant="text" size="small">
              <Typography variant="overline" color="secondary">
                Overview
              </Typography>
            </Button>
            <Button variant="text" size="small">
              <Typography variant="overline" color="secondary">
                Mark All Read
              </Typography>
            </Button>
          </Box>
        }
      />
      <CardContent
        sx={{
          maxHeight: { sm: '100%', md: '450px' },
          overflowY: 'scroll',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderRadius: '10px',
          mx: '.5em',
          mb: '.5em',
          borderColor: 'rgba(24,252,252,.5)',
          background:
            'linear-gradient(135deg, rgba(0,30,100,.4) 0%, rgba(0,1,19,.4) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow:
            '0 4px 8px rgba(0,9,16,.3), 0 8px 16px rgba(0,9,16,.2), 0 16px 32px rgba(0,9,16,.1)',
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
        <List sx={{ listStyleType: 'disc', px: '.5em' }}>
          {notifications.map((notif) => {
            return (
              <AppbarListItem key={notif.id} sx={{ my: '.5em' }}>
                <Tooltip title={notif.text} arrow>
                  <ListItemText
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
                <ListItemButton>View</ListItemButton>
                <IconButton color="error">
                  <Clear color="error" />
                </IconButton>
              </AppbarListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
