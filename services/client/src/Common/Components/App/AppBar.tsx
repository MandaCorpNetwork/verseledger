import VerseLogo from '@Assets/media/VerseLogos/verselogo-0.png?url';
import { useSoundEffect } from '@Audio/AudioManager';
import { UserSettings } from '@Components/UserSettings/UserSettings';
import { Feedback, Place } from '@mui/icons-material';
import MailNoneIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_FEEDBACK } from '@Popups/FeedbackForm/FeedbackPopup';
import { POPUP_LOCATION_INFO } from '@Popups/Info/Locations';
import { POPUP_LOGIN } from '@Popups/Login/LoginPopup';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchCurrentUser } from '@Redux/Slices/Auth/Actions/fetchCurrentUser.action';
import { fetchUserSettings } from '@Redux/Slices/Auth/Actions/fetchUserSettings.action';
import { setUserLocation } from '@Redux/Slices/Auth/Actions/setUserLocation.action';
import {
  selectCurrentUser,
  selectIsLoggedIn,
  selectUserLocation,
} from '@Redux/Slices/Auth/auth.selectors';
import { fetchUnreadCount } from '@Redux/Slices/Notifications/actions/getUnreadCount.action';
import { selectNotificationsUnreadCount } from '@Redux/Slices/Notifications/notifications.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { AuthUtil } from '@Utils/AuthUtil';
import {
  bindMenu,
  bindTrigger,
  PopupState,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { LocationSearch } from './LocationSearch';
import { NotificationsBox } from './NotificationsBox';

export const VLAppBar: React.FC<unknown> = () => {
  const { playSound } = useSoundEffect();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectCurrentUser);
  const [userSettingsOpen, setUserSettingsOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserSettings());
    }
  }, [dispatch, isLoggedIn]);

  const profilePopupState: PopupState = usePopupState({
    variant: 'popover',
    popupId: 'profileNav',
  });

  const handlePlayerCardOpen = () => {
    profilePopupState.close();
    playSound('open');
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid: currentUser?.id }));
  };

  const handleUserSettingsOpen = () => {
    profilePopupState.close();
    playSound('open');
    setUserSettingsOpen(true);
  };

  const handleUserSettingsClose = () => {
    playSound('close');
    setUserSettingsOpen(false);
  };

  const handleFeedbackOpen = () => {
    playSound('open');
    dispatch(openPopup(POPUP_FEEDBACK));
  };

  const renderMenu = (
    <Menu {...bindMenu(profilePopupState)}>
      <MenuItem onClick={handlePlayerCardOpen}>
        <Typography data-testid="AppBar__CurrentUserMenu__PlayerCard">
          Player Card
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleUserSettingsOpen}>
        <Typography data-testid="AppBar__CurrentUserMenu__Settings">Settings</Typography>
      </MenuItem>
      <MenuItem onClick={profilePopupState.close}>
        <Typography data-testid="AppBar__CurrentUserMenu__Logout">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const notificationsOnClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      playSound('open');
      setNotificationsOpen(true);
      setNotificationsAnchorEl(event.currentTarget);
    },
    [playSound],
  );
  const notificationsOnClose = useCallback(() => {
    playSound('close');
    setNotificationsOpen(false);
    setNotificationsAnchorEl(null);
  }, [playSound]);

  const navigate = useNavigate();
  function handleLogoClick() {
    playSound('navigate');
    navigate('/');
  }

  useEffect(() => {
    if (currentUser == null) return;
    dispatch(fetchUnreadCount());
  }, [currentUser, dispatch]);

  const unreadCount = useAppSelector(selectNotificationsUnreadCount);

  const [locationSelectOpen, setLocationSelectOpen] = React.useState(false);
  const [locationSelectAnchorEl, setLocationSelectAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const currentLocation = useAppSelector(selectUserLocation);

  const locationSelectOnClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      playSound('open');
      setLocationSelectOpen(true);
      setLocationSelectAnchorEl(event.currentTarget);
    },
    [playSound],
  );

  const locationSelectOnClose = useCallback(() => {
    playSound('close');
    setLocationSelectOpen(false);
    setLocationSelectAnchorEl(null);
  }, [playSound]);

  const handleLocationSelect = React.useCallback(
    (location: ILocation | null) => {
      if (location) {
        playSound('clickMain');
        dispatch(setUserLocation(location));
      }
    },
    [playSound, dispatch],
  );

  const handleLocationPopup = () => {
    if (location) {
      playSound('open');
      dispatch(openPopup(POPUP_LOCATION_INFO, currentLocation));
    }
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton component="div" sx={{}} onClick={handleLogoClick}>
            <img src={VerseLogo} alt="Verse Logo" />
          </IconButton>
          <div>
            {isLoggedIn ? (
              <>
                <Tooltip title="Set Location" arrow>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={locationSelectOnClick}
                  >
                    <Place />
                  </IconButton>
                </Tooltip>
                <IconButton size="large" color="inherit" onClick={handleFeedbackOpen}>
                  <Feedback />
                </IconButton>
                <IconButton size="large" aria-label="show 4 new messages" color="inherit">
                  <Badge badgeContent={0} color="error">
                    <MailNoneIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label={`show ${unreadCount} new notifications`}
                  color="inherit"
                  onClick={notificationsOnClick}
                >
                  <Badge badgeContent={unreadCount} color="error">
                    {notificationsOpen ? (
                      <NotificationsIcon />
                    ) : (
                      <NotificationsNoneIcon />
                    )}
                  </Badge>
                </IconButton>
                <IconButton
                  data-testid="AppBar__CurrentUserButton"
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  {...bindTrigger(profilePopupState)}
                >
                  <Avatar src={currentUser?.pfp as string}></Avatar>
                </IconButton>
              </>
            ) : (
              <Button
                onClick={() => {
                  dispatch(openPopup(POPUP_LOGIN));
                }}
                color="secondary"
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {notificationsOpen && (
        <Popover
          open={true}
          onClose={notificationsOnClose}
          anchorEl={notificationsAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ p: '1em' }}
        >
          <NotificationsBox />
        </Popover>
      )}
      {locationSelectOpen && (
        <Popover
          open={true}
          onClose={locationSelectOnClose}
          anchorEl={locationSelectAnchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ p: '1em' }}
        >
          <div>
            <IconButton onClick={handleLocationPopup}>
              <Place />
            </IconButton>
            <LocationSearch
              width="250px"
              margin=".5em"
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </Popover>
      )}
      <UserSettings open={userSettingsOpen} onClose={handleUserSettingsClose} />
    </div>
  );
};
