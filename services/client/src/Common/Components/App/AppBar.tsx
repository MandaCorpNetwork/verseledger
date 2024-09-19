import VerseLogo from '@Assets/media/VerseLogos/verselogo-0.png?url';
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
import { Box } from '@mui/system';
import { POPUP_FEEDBACK } from '@Popups/FeedbackForm/FeedbackPopup';
import { POPUP_LOCATION_INFO } from '@Popups/Info/Locations';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { fetchUserSettings } from '@Redux/Slices/Auth/Actions/fetchUserSettings';
import { setUserLocation } from '@Redux/Slices/Auth/Actions/setUserLocation';
import { fetchUnreadCount } from '@Redux/Slices/Notifications/actions/getUnreadCount';
import { selectNotificationsUnreadCount } from '@Redux/Slices/Notifications/notificationSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import {
  bindMenu,
  bindTrigger,
  PopupState,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { useSoundEffect } from '@/AudioManager';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { fetchCurrentUser } from '@/Redux/Slices/Auth/Actions/fetchCurrentUser';
import {
  selectCurrentUser,
  selectIsLoggedIn,
  selectUserLocation,
} from '@/Redux/Slices/Auth/authSelectors';
import { AuthUtil } from '@/Utils/AuthUtil';
import { URLUtil } from '@/Utils/URLUtil';

import { UserSettings } from '../../../Components/UserSettings/UserSettings';
import { LocationSearch } from './LocationSearch';
import { NotificationsBox } from './NotificationsBox';

export const VLAppBar: React.FC<unknown> = () => {
  const { playSound } = useSoundEffect();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectCurrentUser);
  const [userSettingsOpen, setUserSettingsOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) return;
    const accessToken = AuthUtil.getAccessToken();
    if (AuthUtil.isValidToken(accessToken)) {
      dispatch(fetchCurrentUser());
    }
  }, [isLoggedIn, dispatch]);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
        <Toolbar>
          <IconButton component="div" sx={{}} onClick={handleLogoClick}>
            <img src={VerseLogo} alt="Verse Logo" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="Select Location" arrow>
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
                  const loginURL = `https://discord.com/oauth2/authorize?client_id=1160393986440179823&response_type=code&redirect_uri=${encodeURIComponent(URLUtil.frontendHost)}%2Foauth%2Fdiscord%2Fcallback&scope=identify+openid`;
                  localStorage.setItem('returnPath', window.location.pathname);
                  playSound('navigate');
                  window.location = loginURL as unknown as Location;
                }}
                color="secondary"
              >
                Login
              </Button>
            )}
          </Box>
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
          <Box sx={{ display: 'flex' }}>
            <IconButton onClick={handleLocationPopup}>
              <Place />
            </IconButton>
            <LocationSearch
              width="250px"
              margin=".5em"
              onLocationSelect={handleLocationSelect}
            />
          </Box>
        </Popover>
      )}
      <UserSettings open={userSettingsOpen} onClose={handleUserSettingsClose} />
    </Box>
  );
};
