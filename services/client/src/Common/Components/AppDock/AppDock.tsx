import './AppDock.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { Exploration, Fleet, Vehicles } from '@Common/Definitions/CustomIcons';
import {
  ConstructionTwoTone,
  ErrorOutline,
  HomeTwoTone,
  InventoryTwoTone,
  MenuBookTwoTone,
  NewspaperTwoTone,
  Person,
  RouteTwoTone,
  ShoppingBasketTwoTone,
  StackedBarChartTwoTone,
  StoreTwoTone,
  WorkTwoTone,
} from '@mui/icons-material';
import { Alert, Box, Divider, Grow, Popover, Slide, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchCurrentUser } from '@Redux/Slices/Auth/Actions/fetchCurrentUser.action';
import { selectIsLoggedIn } from '@Redux/Slices/Auth/auth.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { AuthUtil } from '@Utils/AuthUtil';
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

export const AppDockComponent: React.FC = () => {
  const [iconGroup, setIconGroup] = React.useState<IconDefinition[]>([]);
  const [key, setKey] = React.useState(0);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  React.useEffect(() => {
    if (isLoggedIn) return;
    const accessToken = AuthUtil.getAccessToken();
    if (AuthUtil.isValidToken(accessToken)) {
      dispatch(fetchCurrentUser());
    }
  }, [isLoggedIn, dispatch]);

  const getIconGroup = React.useCallback(() => {
    switch (location.pathname) {
      case '/dashboard':
      case '/dashboard/overview':
        return dashboardGroup;
      case '/dashboard/explore':
      case '/dashboard/routes':
      case '/dashboard/inventory':
        return exploreGroup;
      case '/dashboard/ship':
      case '/dashboard/fleet':
      case '/dashboard/builder':
      case '/dashboard/tuning':
        return shipGroup;
      case '/dashboard/contracts':
      case '/dashboard/ledger':
        return contractsGroup;
      case '/dashboard/orders':
      case '/dashboard/verse-market':
        return ordersGroup;
      case '/':
        return splashGroup;
      default:
        return dashboardGroup;
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const newGroup = getIconGroup();

    if (newGroup !== iconGroup) {
      setIconGroup(newGroup);
      setKey((prevKey) => prevKey + 1);
    }
  }, [getIconGroup, iconGroup]);

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
    playSound('open');
    dispatch(openPopup(POPUP_APP_LIST));
  }, [playSound, dispatch]);
  return (
    <Box className="Dock">
      {renderUserStatePopover}
      <Slide direction="up" in={!isLoggedIn}>
        <Alert
          severity="error"
          variant="filled"
          sx={{
            position: 'absolute',
            top: -55,
            left: 0,
            right: 0,
            zIndex: 10,
            borderRadius: '10px',
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
      <AppButton label="Home" path="/dashboard/overview" icon={<HomeTwoTone />} />
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
              icon={icon.icon}
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

export const AppDock = React.memo(AppDockComponent);

type IconDefinition = {
  id: string;
  label: string;
  path: string;
  icon: JSX.Element;
  disabled?: boolean;
};

const dashboardGroup: IconDefinition[] = [
  { id: 'explore', label: 'Explore', path: '/dashboard/explore', icon: <Exploration /> },
  { id: 'ship', label: 'Ship', path: '/dashboard/ship', icon: <Vehicles /> },
  {
    id: 'contracts',
    label: 'Contracts',
    path: '/dashboard/contracts',
    icon: <WorkTwoTone />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/dashboard/orders',
    icon: <ShoppingBasketTwoTone />,
  },
];

const exploreGroup: IconDefinition[] = [
  { id: 'explore', label: 'Explore', path: '/dashboard/explore', icon: <Exploration /> },
  { id: 'routes', label: 'Routes', path: '/dashboard/routes', icon: <RouteTwoTone /> },
  {
    id: 'inventory',
    label: 'Inventory',
    path: '/dashboard/inventory',
    icon: <InventoryTwoTone />,
    disabled: true,
  },
];

const shipGroup: IconDefinition[] = [
  { id: 'ship', label: 'Ship', path: '/dashboard/ship', icon: <Vehicles /> },
  {
    id: 'fleet',
    label: 'Fleet',
    path: '/dashboard/fleet',
    icon: <Fleet />,
    disabled: true,
  },
  {
    id: 'builder',
    label: 'Builder',
    path: '/dashboard/builder',
    icon: <ConstructionTwoTone />,
    disabled: true,
  },
  {
    id: 'tuning',
    label: 'Tuning',
    path: '/dashboard/tuning',
    icon: <StackedBarChartTwoTone />,
  },
];

const contractsGroup: IconDefinition[] = [
  {
    id: 'contracts',
    label: 'Contracts',
    path: '/dashboard/contracts',
    icon: <WorkTwoTone />,
  },
  {
    id: 'contract-ledger',
    label: 'Ledger',
    path: '/dashboard/ledger',
    icon: <MenuBookTwoTone />,
  },
];

const ordersGroup: IconDefinition[] = [
  {
    id: 'orders',
    label: 'Orders',
    path: '/dashboard/orders',
    icon: <ShoppingBasketTwoTone />,
  },
  {
    id: 'verse-market',
    label: 'Market',
    path: '/dashboard/verse-market',
    icon: <StoreTwoTone />,
  },
];

const personalAllGroup: IconDefinition[] = [
  { id: 'explore', label: 'Explore', path: '/dashboard/explore', icon: <Exploration /> },
  { id: 'routes', label: 'Routes', path: '/dashboard/routes', icon: <RouteTwoTone /> },
  {
    id: 'inventory',
    label: 'Inventory',
    path: '/dashboard/inventory',
    icon: <InventoryTwoTone />,
    disabled: true,
  },
  { id: 'ship', label: 'Ship', path: '/dashboard/ship', icon: <Vehicles /> },
  {
    id: 'fleet',
    label: 'Fleet',
    path: '/dashboard/fleet',
    icon: <Fleet />,
    disabled: true,
  },
  {
    id: 'builder',
    label: 'Builder',
    path: '/dashboard/builder',
    icon: <ConstructionTwoTone />,
    disabled: true,
  },
  {
    id: 'tuning',
    label: 'Tuning',
    path: '/dashboard/tuning',
    icon: <StackedBarChartTwoTone />,
  },
  {
    id: 'contracts',
    label: 'Contracts',
    path: '/dashboard/contracts',
    icon: <WorkTwoTone />,
  },
  {
    id: 'contract-ledger',
    label: 'Ledger',
    path: '/dashboard/ledger',
    icon: <MenuBookTwoTone />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/dashboard/orders',
    icon: <ShoppingBasketTwoTone />,
  },
  {
    id: 'verse-market',
    label: 'Market',
    path: '/dashboard/verse-market',
    icon: <StoreTwoTone />,
  },
];

const splashGroup: IconDefinition[] = [
  {
    id: 'contract-ledger',
    label: 'Ledger',
    path: '/dashboard/ledger',
    icon: <MenuBookTwoTone />,
  },
  {
    id: 'verse-market',
    label: 'Market',
    path: '/dashboard/verse-market',
    icon: <StoreTwoTone />,
  },
  {
    id: 'verse-news',
    label: 'News',
    path: '/verse-news',
    icon: <NewspaperTwoTone />,
  },
];

// const orgLedgerGroup = [];
