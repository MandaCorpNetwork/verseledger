import '../AppDock.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { NotificationsBox } from '@Common/Components/App/NotificationsBox';
import {
  Feedback,
  Logout,
  MailOutline,
  Notifications,
  NotificationsOutlined,
  Person,
  Settings,
} from '@mui/icons-material';
import { Avatar, Badge, Box, Popover, SpeedDial, SpeedDialAction } from '@mui/material';
import { POPUP_FEEDBACK } from '@Popups/FeedbackForm/FeedbackPopup';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { fetchUnreadCount } from '@Redux/Slices/Notifications/actions/getUnreadCount.action';
import { selectNotificationsUnreadCount } from '@Redux/Slices/Notifications/notifications.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UserDial: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = React.useState<boolean>(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const handleFeedbackOpen = React.useCallback(() => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_FEEDBACK));
  }, [sound, dispatch]);

  const notificationsOnClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      sound.playSound('open');
      setNotificationsOpen(true);
      setNotificationsAnchorEl(event.currentTarget);
    },
    [sound],
  );
  const notificationsOnClose = React.useCallback(() => {
    sound.playSound('close');
    setNotificationsOpen(false);
    setNotificationsAnchorEl(null);
  }, [sound]);

  React.useEffect(() => {
    if (user == null) return;
    dispatch(fetchUnreadCount());
  }, [user, dispatch]);

  const unreadNotifCount = useAppSelector(selectNotificationsUnreadCount);

  const notificationIcon = notificationsOpen ? (
    <Notifications />
  ) : unreadNotifCount > 0 ? (
    <Notifications />
  ) : (
    <NotificationsOutlined />
  );

  const toggleOpen = React.useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  return (
    <Box sx={{ position: 'relative' }}>
      <SpeedDial
        ariaLabel="UserDial"
        direction="right"
        icon={<Avatar className="User-Avatar" src={user?.pfp} />}
        className="User-Dial"
        transitionDuration={1000}
        open={menuOpen}
        onClick={toggleOpen}
        onMouseLeave={toggleOpen}
        sx={{
          '& .MuiFab-root': {
            bgcolor: 'transparent',
            boxShadow: 'none',
            '& .MuiTouchRipple-root': {
              color: 'rgba(14,252,252,0.7)',
            },
          },
        }}
      >
        {/*//TODO: Fix Badge Bug */}
        <SpeedDialAction
          icon={
            <Badge badgeContent={unreadNotifCount} color="error">
              {React.cloneElement(notificationIcon, {
                fontSize: 'large',
                className: 'User-Dial-Option',
              })}
            </Badge>
          }
          tooltipTitle="Notifications"
          tooltipPlacement="bottom"
          onClick={notificationsOnClick}
        />
        {/*//TODO: Setup Mail System */}
        <SpeedDialAction
          icon={
            <Badge badgeContent={0} color="error">
              <MailOutline fontSize="large" className="User-Dial-Option" />
            </Badge>
          }
          tooltipTitle="Messages"
          tooltipPlacement="bottom"
        />
        <SpeedDialAction
          icon={<Person fontSize="large" className="User-Dial-Option" />}
          tooltipTitle="Profile"
          tooltipPlacement="bottom"
          onClick={() => navigate(`/user/${user?.id}`)}
        />
        <SpeedDialAction
          icon={<Settings fontSize="large" className="User-Dial-Option" />}
          tooltipTitle="Settings"
          tooltipPlacement="bottom"
          onClick={() => navigate('/settings')}
        />
        <SpeedDialAction
          icon={<Feedback fontSize="large" className="User-Dial-Option" />}
          tooltipTitle="Feedback"
          tooltipPlacement="bottom"
          onClick={handleFeedbackOpen}
        />
        {/*//TODO: Logout functionality */}
        <SpeedDialAction
          icon={<Logout fontSize="large" className="User-Dial-Option" />}
          tooltipTitle="Logout"
          tooltipPlacement="bottom"
        />
      </SpeedDial>
      {notificationsOpen && (
        <Popover
          open={true}
          onClose={notificationsOnClose}
          anchorEl={notificationsAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{ p: '1em' }}
        >
          <NotificationsBox />
        </Popover>
      )}
    </Box>
  );
};
