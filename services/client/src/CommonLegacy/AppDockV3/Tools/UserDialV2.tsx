import '@Assets/Css/AppDockV3.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { NotificationsBox } from '@CommonLegacy/Components/App/NotificationsBox';
import {
  Feedback,
  Logout,
  Mail,
  MailOutline,
  MarkunreadMailbox,
  Notifications,
  NotificationsActive,
  NotificationsOutlined,
  Person,
  Settings,
} from '@mui/icons-material';
import { Avatar, Popover, SpeedDial, SpeedDialAction, SvgIcon } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { selectNotificationsUnreadCount } from '@Redux/Slices/Notifications/notifications.selectors';
import { useNav } from '@Utils/Hooks/useNav';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import React, { useState } from 'react';

type UserDialProps = {
  quality: string;
  animations: string;
};

export const UserDialV2: React.FC<UserDialProps> = ({ quality, animations }) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const hoverRef = React.useRef(false);
  const timeoutRef = React.useRef<number | null>(null);

  const sound = useSoundEffect();
  const nav = useNav();

  const user = useAppSelector(selectCurrentUser);
  const unreadNotifCount = useAppSelector(selectNotificationsUnreadCount);

  const toggleOpen = React.useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = React.useCallback(() => {
    sound.playSound('close');
    setMenuOpen(false);
    hoverRef.current = false;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
  }, [sound]);

  const openMenu = React.useCallback(() => {
    hoverRef.current = true;
    timeoutRef.current = window.setTimeout(() => {
      if (hoverRef.current && !menuOpen) {
        setMenuOpen(true);
        sound.playSound('open');
      }
    }, 800);
  }, [sound, menuOpen]);

  const userDialStyles = React.useMemo(() => {
    const classNames: string[] = [];
    switch (quality) {
      case 'low':
      case 'potato':
        classNames.push('NormalUserDial');
        break;
      // case 'high':
      // case 'medium':
      default:
        classNames.push('AdvUserDial');
        break;
    }
    return classNames.join(' ');
  }, [quality]);

  const userDialTransition = React.useMemo(() => {
    if (animations === 'low' || animations === 'none') return 0;
    if (animations === 'high') return 1000;
    return 250;
  }, [animations]);

  const userDialAvatarStyles = React.useMemo(() => {
    const classNames: string[] = [];
    switch (quality) {
      case 'low':
      case 'potato':
        classNames.push('LowUserDialAvatar');
        break;
      // case 'high':
      // case 'medium':
      default:
        classNames.push('UserDialAvatar');
    }
    switch (animations) {
      case 'high':
        classNames.push('UserDialAvatarHighAnimations');
        break;
      case 'low':
        classNames.push('UserDialAvatarLowAnimations');
        break;
      case 'none':
        break;
      // case 'medium':
      default:
        classNames.push('UserDialAvatarMedAnimations');
        break;
    }
    return classNames.join(' ');
  }, [quality, animations]);

  const userDialActionIconStyles = React.useMemo(() => {
    const classNames: string[] = [];
    switch (quality) {
      case 'high':
        classNames.push('AdvUserDialAction');
        break;
      case 'low':
        classNames.push('LowUserDialAction');
        break;
      case 'potato':
        classNames.push('PotatoUserDialAction');
        break;
      // case 'medium':
      default:
        classNames.push('AdvUserDialAction');
        break;
    }
    switch (animations) {
      case 'high':
        classNames.push('UserDialActionHighAnimation');
        break;
      case 'low':
        classNames.push('UserDialActionLowAnimation');
        break;
      case 'none':
        break;
      // case 'medium':
      default:
        classNames.push('UserDialActionMedAnimation');
        break;
    }
    return classNames.join(' ');
  }, [animations, quality]);

  const notificationPopupState = usePopupState({
    variant: 'popover',
    popupId: 'notificationPopup',
  });

  const renderNotificationPopover = (
    <Popover
      data-testid="AppDock-UserDial__Notifications_Popover"
      id="AppDock-UserDial__Notifications_Popover"
      {...bindPopover(notificationPopupState)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <NotificationsBox popupState={notificationPopupState} />
    </Popover>
  );

  const notificationOpen = notificationPopupState.isOpen;

  const NotificationIcon = React.useMemo(() => {
    if (notificationOpen) return Notifications;
    if (unreadNotifCount > 0) return NotificationsActive;
    return NotificationsOutlined;
  }, [notificationOpen, unreadNotifCount]);

  const notificationIconStyle = React.useMemo(() => {
    if (unreadNotifCount > 0) return 'UnreadNotifications';
    return '';
  }, [unreadNotifCount]);

  const { onClick: triggerOnClick } = bindTrigger(notificationPopupState);

  const handleNotificationClick = React.useCallback(
    (e: React.MouseEvent) => {
      sound.playSound('open');
      triggerOnClick(e);
    },
    [sound, triggerOnClick],
  );

  const [mailOpen] = useState(false);

  const [unreadMailCount] = useState(0);

  const MailIcon = React.useMemo(() => {
    if (mailOpen) return Mail;
    if (unreadMailCount > 0) return MarkunreadMailbox;
    return MailOutline;
  }, [mailOpen, unreadMailCount]);

  const mailIconStyle = React.useMemo(() => {
    if (unreadMailCount > 0) return 'UnreadNotifications';
    return '';
  }, [unreadMailCount]);

  const speedDialSize = React.useMemo(() => {
    switch (quality) {
      case 'low':
      case 'potato':
        return 'medium';
      // case 'high':
      // case 'medium':
      default:
        return 'large';
    }
  }, [quality]);

  return (
    <div data-testid="AppDock__UserDial_Wrapper" className="AppIconContainer">
      <SpeedDial
        data-testid="AppDock__UserDial"
        id="AppDock__UserDial"
        ariaLabel="UserDial"
        className={userDialStyles}
        direction="right"
        transitionDuration={userDialTransition}
        icon={
          <Avatar
            className={userDialAvatarStyles}
            src={user?.pfp}
            sx={[
              (quality === 'low' || quality === 'potato') && {
                width: 30,
                height: 30,
              },
            ]}
          />
        }
        open={menuOpen}
        onClick={toggleOpen}
        onMouseLeave={closeMenu}
        onMouseEnter={openMenu}
        FabProps={{
          size: speedDialSize,
        }}
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
        <SpeedDialAction
          data-testid="AppDock-UserDial__Notification_Button"
          tooltipTitle="Notifications"
          tooltipPlacement="bottom"
          {...bindTrigger}
          onClick={handleNotificationClick}
          icon={
            <SvgIcon
              component={NotificationIcon}
              fontSize={speedDialSize}
              className={notificationIconStyle}
            />
          }
        />
        <SpeedDialAction
          data-testid="AppDock-UserDial__Messages_Button"
          tooltipTitle="Messages"
          tooltipPlacement="bottom"
          icon={
            <SvgIcon
              component={MailIcon}
              fontSize={speedDialSize}
              className={mailIconStyle}
            />
          }
        />
        <SpeedDialAction
          data-testid="AppDock-UserDial__Profile_Button"
          tooltipTitle="Profile"
          tooltipPlacement="bottom"
          onClick={(e) => nav(`/user/${user?.id}`, 'internal', true).onClick(e)}
          onAuxClick={(e) => nav(`/user/${user?.id}`, 'internal', true).onAuxClick(e)}
          icon={<Person fontSize={speedDialSize} className={userDialActionIconStyles} />}
        />
        <SpeedDialAction
          data-testid="AppDock-UserDial__Settings_Button"
          tooltipTitle="Settings"
          tooltipPlacement="bottom"
          onClick={(e) => nav('/settings/Profile', 'internal', true).onClick(e)}
          onAuxClick={(e) => nav('/settings/Profile', 'internal', true).onAuxClick(e)}
          icon={
            <Settings fontSize={speedDialSize} className={userDialActionIconStyles} />
          }
        />
        <SpeedDialAction
          data-testid="AppDock-UserDial__Support_Button"
          tooltipTitle="Support"
          tooltipPlacement="bottom"
          onClick={(e) => nav('/support/report', 'internal', true).onClick(e)}
          onAuxClick={(e) => nav('`/support/reporrt', 'internal', true).onAuxClick(e)}
          icon={
            <Feedback fontSize={speedDialSize} className={userDialActionIconStyles} />
          }
        />
        <SpeedDialAction
          data-testid="AppDock-UserDial__Logout_Button"
          tooltipTitle="Logout"
          tooltipPlacement="bottom"
          icon={<Logout fontSize={speedDialSize} className={userDialActionIconStyles} />}
          onClick={() => sound.playSound('denied')}
        />
      </SpeedDial>
      {renderNotificationPopover}
    </div>
  );
};
