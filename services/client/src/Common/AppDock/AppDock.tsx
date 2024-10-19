import './AppDock.css';

import { useSoundEffect } from '@Audio/AudioManager';
import {
  AppGroup,
  AppListing,
  contractApps,
  dashApps,
  exploreApps,
  masterAppList,
  orderApps,
  personalApps,
  shipApps,
  splashApps,
} from '@Common/Definitions/AppListings';
import { ErrorOutline, HomeTwoTone, Person } from '@mui/icons-material';
import { Alert, Box, Divider, Grow, Popover, Slide, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectIsLoggedIn } from '@Redux/Slices/Auth/auth.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { AppButton } from './Icons/AppButton';
import { LoginIcon } from './Icons/LoginIcon';
import { MoreIcon } from './Icons/MoreIcon';
import { SplashIcon } from './Icons/SplashIcon';
import { UserStateIcon } from './Icons/UserStateIcon';
import { POPUP_APP_LIST } from './Tools/AllApps';
import { UserDial } from './Tools/UserDial';
import { UserStateManager } from './Tools/UserStateManager';

export const AppDock: React.FC = () => {
  const [iconGroup, setIconGroup] = React.useState<AppListing[]>([]);
  const [key, setKey] = React.useState(0);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const containerRef = React.useRef<HTMLElement>(null);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const getAppListings = React.useCallback((group: AppGroup): AppListing[] => {
    return masterAppList.filter((app) => group.list.includes(app.id));
  }, []);

  const getIconGroup = React.useCallback(() => {
    const path = location.pathname;
    switch (true) {
      case path === '/apps':
      case path.startsWith('/apps/dashboard'):
        return getAppListings(dashApps);
      case path.startsWith('/apps/explore'):
      case path.startsWith('/apps/routes'):
      case path.startsWith('/apps/inventory'):
        return getAppListings(exploreApps);
      case path.startsWith('/apps/ship'):
      case path.startsWith('/apps/fleet'):
      case path.startsWith('/apps/builder'):
      case path.startsWith('/apps/tuning'):
        return getAppListings(shipApps);
      case path.startsWith('/apps/contracts'):
      case path.startsWith('/apps/ledger'):
      case path.startsWith('/contract'):
        return getAppListings(contractApps);
      case path.startsWith('/apps/orders'):
      case path.startsWith('/apps/verse-market'):
        return getAppListings(orderApps);
      case path.startsWith('/user'):
      case path.startsWith('/settings'):
        return getAppListings(personalApps);
      case path === '/':
      default:
        return getAppListings(splashApps);
    }
  }, [location.pathname, getAppListings]);

  const userStatePopupState = usePopupState({
    variant: 'popover',
    popupId: 'userStatePopup',
  });

  const renderUserStatePopover = (
    <Popover
      {...bindPopover(userStatePopupState)}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      sx={{ p: '1em' }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        },
      }}
    >
      <UserStateManager />
    </Popover>
  );

  const handleOpenAll = React.useCallback(() => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_APP_LIST));
  }, [sound, dispatch]);

  React.useEffect(() => {
    const newGroup = getIconGroup();
    setIconGroup(newGroup);
    setKey((prevKey) => prevKey + 1);
  }, [setKey, getIconGroup]);
  return (
    <Box className="Dock" ref={containerRef}>
      {renderUserStatePopover}
      <Slide
        direction="up"
        in={!isLoggedIn}
        mountOnEnter
        unmountOnExit
        container={containerRef.current}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{
            position: 'absolute',
            top: -55,
            left: 0,
            right: 0,
            zIndex: 10,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(255,0,0,0.2), rgba(120,0,0,0.3))',
            backdropFilter: 'blur(20px)',
          }}
          iconMapping={{
            error: <ErrorOutline fontSize="medium" className="Alert-Icon" />,
          }}
        >
          <Typography
            className="Alert-Text"
            sx={{
              display: 'flex',
              gap: '0.5em',
              fontWeight: 'bold',
              overflow: 'visible',
              color: 'error.contrastText',
            }}
          >
            Please Sign In <Person fontSize="medium" className="Alert-Icon" />
          </Typography>
        </Alert>
      </Slide>
      <Box>
        <SplashIcon />
        <UserStateIcon popupState={userStatePopupState} />
      </Box>
      <AppButton label="Home" path="/apps/dashboard" icon={<HomeTwoTone />} />
      <Divider
        orientation="vertical"
        flexItem
        sx={{ opacity: '0.4', borderRightWidth: '2px' }}
      />
      <Grow in timeout={1000} key={key} style={{ transformOrigin: '0 0' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5em' }}>
          {iconGroup.map((icon) => (
            <AppButton
              key={icon.id}
              label={icon.label}
              path={icon.path}
              icon={icon.icon as JSX.Element}
              disabled={icon.disabled ?? false}
            />
          ))}
        </Box>
      </Grow>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <MoreIcon toggleView={handleOpenAll} />
        {isLoggedIn ? <UserDial /> : <LoginIcon />}
      </Box>
    </Box>
  );
};
