import '@Assets/Css/AppDockV3.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { LoginIcon } from '@Common/AppDockV3/Buttons/LoginIcon';
import { MoreIcon } from '@Common/AppDockV3/Buttons/MoreIcon';
import { SplashIcon } from '@Common/AppDockV3/Buttons/SplashIcon';
import { UserStateIcon } from '@Common/AppDockV3/Tools/UserStateIcon';
import { UserStateManager } from '@Common/AppDockV3/Tools/UserStateManager';
import { useMasterAppList, VerseLedgerVersion } from '@Common/Definitions/AppListings';
import { ErrorOutline, HomeTwoTone, Person } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  Popover,
  Portal,
  Slide,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import {
  selectAnimations,
  selectIsLoggedIn,
  selectQuality,
} from '@Redux/Slices/Auth/auth.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { siteMode } from '@Utils/siteMode';
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { POPUP_APP_LIST } from './Tools/AllAppsModal';
import { UserDialV2 } from './Tools/UserDialV2';

const AppButtonV2 = React.lazy(async () => {
  const module = await import('@Common/Components/Buttons/AppButtonV2');
  return { default: module.AppButtonV2 };
});

const AdvancedDockPanel = React.lazy(async () => {
  const module = await import('./DockPanels/AdvancedPanel');
  return { default: module.AdvancedDockPanel };
});

export const AppDock: React.FC = () => {
  const location = useLocation();
  const containerRef = React.useRef<HTMLElement>(null);
  const masterAppList = useMasterAppList();
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const animationSetting = useAppSelector(selectAnimations);
  const qualitySetting = useAppSelector(selectQuality);

  const handleOpenAll = React.useCallback(() => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_APP_LIST));
  }, [sound, dispatch]);

  const userStatePopupState = usePopupState({
    variant: 'popover',
    popupId: 'userStatePopup',
  });

  const renderUserStatePopover = (
    <Popover
      data-testid="AppDock__UserState_Popover"
      id="AppDock__UserState_Popover"
      {...bindPopover(userStatePopupState)}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      sx={{ p: '1em' }}
      TransitionProps={{
        unmountOnExit: true,
        mountOnEnter: true,
      }}
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
          },
        },
      }}
      aria-label="Current User Status Popover"
    >
      <UserStateManager />
    </Popover>
  );

  const getCurrentApp = React.useCallback(() => {
    if (location.pathname === '/apps') {
      return;
    }
    if (location.pathname.startsWith('/contract')) {
      return masterAppList.find((app) => app.id === 'contracts');
    }
    if (location.pathname.startsWith('/user')) {
      return masterAppList.find((app) => app.id === 'profile');
    }
    return masterAppList.find((app) => location.pathname.startsWith(app.path));
  }, [location.pathname, masterAppList]);

  const currentApp = getCurrentApp();

  const appLabel = currentApp ? currentApp.versionLabel : 'VerseLedger';
  const version = currentApp ? currentApp.version : VerseLedgerVersion;

  const getVersionLabel = React.useCallback(
    () => (
      <Portal>
        <Typography
          data-testid="AppDock-VersionLabel__Text"
          variant="body2"
          sx={[
            {
              position: 'fixed',
              bottom: 10,
              left: 16,
              opacity: '0.7',
            },
            version === VerseLedgerVersion && { opacity: '1', fontWeight: 'bold' },
          ]}
          aria-label={`Current version of ${appLabel} is ${version}`}
        >
          {appLabel} {version} {siteMode}
        </Typography>
      </Portal>
    ),
    [appLabel, version],
  );

  const versionLabel = getVersionLabel();

  const dockContainerStyles = React.useMemo(() => {
    const classNames: string[] = [];

    switch (qualitySetting) {
      case 'high':
        classNames.push('AdvDock');
        classNames.push('AdvDockHighFidelity');
        break;
      case 'medium':
      default:
        classNames.push('AdvDock');
        classNames.push('AdvDockMedFidelity');
    }

    switch (animationSetting) {
      case 'high':
        classNames.push('AdvDockHighAnimation');
        break;
      case 'none':
        return classNames.join(' ');
      case 'medium':
      default:
        if (qualitySetting === 'high' || qualitySetting === 'medium') {
          classNames.push('AdvDockMedAnimation');
        }
        break;
    }

    return classNames.join(' ');
  }, [animationSetting, qualitySetting]);

  //TODO: Accessibility Props for Alert
  const loginAlert = (
    <Alert
      data-testid="AppDock__NotLoggedIn_Alert"
      id="AppDock__NotLoggedIn_Alert"
      severity="error"
      variant="outlined"
      sx={{
        position: 'absolute',
        top: -60,
        left: 0,
        right: 0,
        zIndex: 10,
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(255,0,0), rgba(120,0,0))',
        backdropFilter: 'blur(50px)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: -5,
          borderRadius: '10px',
        },
      }}
      iconMapping={{
        error: <ErrorOutline fontSize="medium" className="Alert-Icon" />,
      }}
    >
      <AlertTitle
        data-testid="AppDock-NotLoggedIn-Alert__Title"
        id="AppDock-NotLoggedIn-Alert__Title"
        className="Alert-Text"
        sx={{
          color: 'error.contrastText',
        }}
      >
        Please Sign In for All Features
        <Person fontSize="medium" className="Alert-Icon" />
      </AlertTitle>
    </Alert>
  );

  const useAlertSlide = animationSetting === 'high' || animationSetting === 'medium';

  const renderDockPanel = React.useCallback(() => {
    switch (qualitySetting) {
      case 'high':
      case 'medium':
      default:
        return (
          <Suspense>
            <AdvancedDockPanel />
          </Suspense>
        );
    }
  }, [qualitySetting]);

  const dockPanel = renderDockPanel();

  return (
    <Box
      data-testid="AppDock__Dock_Container"
      id="AppDock__Dock_Container"
      ref={containerRef}
      className={dockContainerStyles}
      aria-label="Navigation Dock"
      component="div"
      data-type="navigation"
    >
      {renderUserStatePopover}
      {versionLabel}
      {useAlertSlide && (
        <Slide
          data-testid="AppDock__LoginAlert_SlideTransition"
          id="AppDock__LoginAlert_SlideTransition"
          direction="up"
          in={!isLoggedIn}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          {loginAlert}
        </Slide>
      )}
      {!useAlertSlide && !isLoggedIn && loginAlert}
      <div data-testid="AppDock__SplashButton&StateButton_Wrapper">
        <SplashIcon quality={qualitySetting} animations={animationSetting} />
        {isLoggedIn && (
          <UserStateIcon
            popupState={userStatePopupState}
            quality={qualitySetting}
            animations={animationSetting}
          />
        )}
      </div>
      <Suspense>
        <AppButtonV2 icon={HomeTwoTone} label="@APP.HOME.LABEL" path="/apps/dashboard" />
      </Suspense>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ opacity: '0.4', borderRightWidth: '2px' }}
      />
      {dockPanel}
      <div
        data-testid="AppDock__AllAppsButton&UserButton_Wrapper"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <MoreIcon
          toggleView={handleOpenAll}
          quality={qualitySetting}
          animations={animationSetting}
        />
        {isLoggedIn ? (
          <UserDialV2 quality={qualitySetting} animations={animationSetting} />
        ) : (
          <LoginIcon />
        )}
      </div>
    </Box>
  );
};
