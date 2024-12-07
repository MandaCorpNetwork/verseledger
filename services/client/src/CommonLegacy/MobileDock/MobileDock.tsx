import { useSoundEffect } from '@Audio/AudioManager';
import { POPUP_APP_LIST } from '@CommonLegacy/AppDockV3/Tools/AllAppsModal';
import {
  AppGroup,
  AppListing,
  contractApps,
  dashApps,
  exploreApps,
  orderApps,
  shipApps,
  splashApps,
  useMasterAppList,
} from '@CommonLegacy/DefinitionsLegacy/AppListings';
import { Discord } from '@CommonLegacy/DefinitionsLegacy/CustomIcons';
import {
  AppsTwoTone,
  Google,
  HomeTwoTone,
  MailTwoTone,
  NotificationsTwoTone,
  PersonTwoTone,
  SettingsTwoTone,
} from '@mui/icons-material';
import { Avatar, keyframes, SpeedDial, SpeedDialAction, SvgIcon } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { getLoginMethods } from '@Redux/Slices/Auth/Actions/getLoginMethods.action';
import { selectCurrentUser, selectIsLoggedIn } from '@Redux/Slices/Auth/auth.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { useLocation } from 'react-router-dom';

const appConstants = [
  { id: 'all', icon: <AppsTwoTone />, name: 'All Apps' },
  { id: 'home', icon: <HomeTwoTone />, name: 'Home' },
  { id: 'notif', icon: <NotificationsTwoTone />, name: 'Notifications' },
  { id: 'message', icon: <MailTwoTone />, name: 'Messages' },
  { id: 'settings', icon: <SettingsTwoTone />, name: 'Settings' },
];

const activeButton = keyframes`
  0% {
    background-size: 100%;
  }
  50% {
    background-size: 200%;
    box-shadow: 0 0 20px 8px rgba(0, 255, 0, 0.4);
  }
  100% {
    background-size: 100%;
  }
`;

const notify = keyframes`
  0% {
    background-size: 100%;
  }
  50% {
    background-size: 150%;
    box-shadow: 0 0 20px 8px rgba(255, 0, 0, 0.4);
  }
  100% {
    background-size: 100%;
  }
`;

type MobileDockProps = {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  vCenter?: boolean;
  hCenter?: boolean;
  // fade?: boolean;
  // xOffset?: number;
  // yOffset?: number;
};

export const MobileDock: React.FC<MobileDockProps> = ({
  // fade,
  // xOffset,
  // yOffset,
  top,
  bottom,
  left,
  right,
  vCenter,
  hCenter,
}) => {
  // Open Logic
  const [open, setOpen] = React.useState<boolean>(false);
  const sound = useSoundEffect();
  const handleClick = React.useCallback(() => {
    setOpen((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [setOpen, sound]);

  // **Dock Position Logic
  const getPosition = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const position = {} as any;
    // Handle vertical positioning
    if (vCenter) {
      position.top = '50%';
      position.transform = 'translateY(-50%)';
    } else if (top) {
      position.top = 0;
    } else if (bottom) {
      position.bottom = 0;
    }
    // Handle horizontal positioning
    if (hCenter) {
      position.left = '50%';
      position.transform = `${position.transform || ''} translateX(-50%)`.trim();
    } else if (left) {
      position.left = 0;
    } else if (right) {
      position.right = 0;
    }
    return position;
  }, [top, left, right, bottom, vCenter, hCenter]);
  const position = getPosition();

  // ** Icon Positioning Logic

  const getQCPos = React.useCallback(
    (index: number, appCount: number, radius: number) => {
      const angle = (90 / (appCount - 1)) * index;
      const radian = (angle * Math.PI) / 180;

      const position: { top: number; left: number } = { top: 0, left: 0 };

      if (bottom && left) {
        position.top = -radius * Math.cos(radian);
        position.left = radius * Math.sin(radian);
      } else if (bottom && right) {
        position.top = -radius * Math.cos(radian);
        position.left = -radius * Math.sin(radian);
      } else if (top && left) {
        position.top = radius * Math.cos(radian);
        position.left = radius * Math.sin(radian);
      } else if (top && right) {
        position.top = radius * Math.cos(radian);
        position.left = -radius * Math.sin(radian);
      }
      return position;
    },
    [bottom, left, right, top],
  );

  const getHCPos = React.useCallback(
    (index: number, appCount: number, radius: number) => {
      const angle = (180 / (appCount - 1)) * index;
      const radian = (angle * Math.PI) / 180;

      const position: { top: number; left: number } = { top: 0, left: 0 };

      if (vCenter && left) {
        position.top = radius * Math.cos(radian);
        position.left = radius * Math.sin(radian);
      } else if (vCenter && right) {
        position.top = -radius * Math.cos(radian);
        position.left = -radius * Math.sin(radian);
      } else if (hCenter && bottom) {
        position.top = -radius * Math.sin(radian);
        position.left = radius * Math.cos(radian);
      } else if (hCenter && top) {
        position.top = radius * Math.sin(radian);
        position.left = -radius * Math.cos(radian);
      }
      return position;
    },
    [top, left, right, bottom, vCenter, hCenter],
  );

  const getFCPos = React.useCallback(
    (index: number, appCount: number, radius: number) => {
      const angle = (360 / appCount) * index;
      const radian = (angle * Math.PI) / 180;

      const position: { top: number; left: number } = { top: 0, left: 0 };
      position.top = radius * Math.cos(radian);
      position.left = radius * Math.sin(radian);
      return position;
    },
    [],
  );

  const getIconPos = React.useCallback(
    (index: number, count: number, inner: boolean) => {
      if (vCenter && hCenter) {
        const radius = inner ? -120 : -200;
        return getFCPos(index, count, radius);
      } else if (vCenter || hCenter) {
        const radius = inner ? 120 : 200;
        return getHCPos(index, count, radius);
      } else {
        const radius = inner ? 120 : 200;
        return getQCPos(index, count, radius);
      }
    },
    [vCenter, hCenter, getFCPos, getHCPos, getQCPos],
  );

  // Fetching the Page Determined Icons
  const location = useLocation();
  const masterAppList = useMasterAppList();
  const getAppListings = React.useCallback(
    (group: AppGroup): AppListing[] => {
      return masterAppList.filter((app) => group.list.includes(app.id));
    },
    [masterAppList],
  );

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
        return getAppListings(splashApps);
      case path === '/':
      default:
        return getAppListings(splashApps);
    }
  }, [location.pathname, getAppListings]);

  const [iconGroup, setIconGroup] = React.useState<AppListing[]>([]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const newGroup = getIconGroup();
    setIconGroup(newGroup);
  }, [getIconGroup]);
  const navigate = useNav();

  const handleOpenAll = React.useCallback(() => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_APP_LIST));
  }, [sound, dispatch]);

  const handleConstNav = React.useCallback(
    (id: 'home' | 'settings', e: React.MouseEvent) => {
      if (id === 'home') {
        const url = `/apps/dashboard`;
        navigate(url, 'internal', true).onClick(e);
      }
      if (id === 'settings') {
        const url = `/settings`;
        navigate(url, 'internal', true).onClick(e);
      }
    },
    [navigate],
  );
  const appConstantsOnClick = React.useCallback(
    (id: string, e: React.MouseEvent) => {
      if (id === 'home' || id === 'settings') return handleConstNav(id, e);
      if (id === 'all') return handleOpenAll();
    },
    [handleConstNav, handleOpenAll],
  );
  const isConstantDisabled = React.useCallback(
    (id: string) => {
      if (id === 'notifications' || id === 'messages' || id === 'all') return false;
      const path = location.pathname;
      if (id === 'home' && (path === '/apps' || path === '/apps/dashboard')) {
        return true;
      }
      if (id === 'settings' && path === '/settings') {
        return true;
      }
      return false;
    },
    [location.pathname],
  );

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const currentUser = useAppSelector(selectCurrentUser);

  const dialIcon = isLoggedIn ? (
    <Avatar src={currentUser?.pfp} />
  ) : (
    <PersonTwoTone fontSize="large" color="warning" />
  );

  const onClick = React.useCallback(() => {
    localStorage.setItem('returnPath', window.location.pathname);
  }, []);

  const [loginMethods, setLoginMethods] = React.useState<
    { type: string; redirect: string }[]
  >([]);

  const findLoginMethods = React.useCallback(() => {
    dispatch(getLoginMethods()).then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLoginMethods((res.payload as any).data);
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (!isLoggedIn) {
      findLoginMethods();
    }
  }, [isLoggedIn, findLoginMethods]);

  const loginButtons = [
    { id: 'discord', icon: <Discord />, label: 'Discord', href: '' },
    { id: 'google', icon: <Google />, label: 'Google', href: '' },
  ].map((button) => {
    const matchingMethod = loginMethods.find((method) => method.type === button.label);
    return {
      ...button,
      href: matchingMethod ? matchingMethod.redirect : '',
    };
  });

  return (
    <SpeedDial
      ariaLabel="menu"
      direction="up"
      open={open}
      onClick={handleClick}
      icon={dialIcon}
      sx={[
        {
          position: 'absolute',
          mx: '10px',
          mb: '10px',
          '& .MuiFab-root': {
            bgcolor: 'primary.light',
          },
        },
        { ...position },
        !isLoggedIn && {
          '& .MuiFab-root': {
            bgcolor: 'transparent',
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,0,0) 15%, rgba(140,0,0,0.5) 70%)',
            backgroundPosition: 'center',
            animation: `${notify} 3s ease-in-out infinite`,
          },
          '& .MuiTouchRipple-root': {
            color: 'rgba(255,193,0,0.7)',
          },
        },
      ]}
    >
      {isLoggedIn &&
        appConstants.map((action, index) => {
          const position = getIconPos(index, 5, true);
          const open = isConstantDisabled(action.id);
          const disabled = !!(action.id === 'notif' || action.id === 'message');
          return (
            <SpeedDialAction
              key={action.id}
              tooltipTitle={action.name}
              onClick={(e) => appConstantsOnClick(action.id, e)}
              icon={React.cloneElement(action.icon as JSX.Element, {
                fontSize: 'large',
                sx: [
                  { color: 'primary.light' },
                  disabled && { color: 'secondary.dark' },
                  open && { color: 'success.main' },
                ],
              })}
              sx={[
                {
                  position: 'absolute',
                  bgcolor: 'transparent',
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(14,35,141) 15%, rgba(14,35,141,0.5) 70%)',
                  boxShadow:
                    '0 0 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.6)',
                },
                { ...position },
                open && {
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(24, 252, 252, 1) 10%, rgba(121, 192, 244, 0.5) 70%)',
                  backgroundPosition: 'center',
                  animation: `${activeButton} 3s ease-in-out infinite`,
                },
                disabled && {
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(0,30,100) 15%, rgba(0, 73, 130,0.8) 70%)',
                },
                (action.id === 'notif' || action.id === 'message') &&
                  !disabled && {
                    backgroundImage:
                      'radial-gradient(circle at center, rgba(181,137,4,1) 10%, rgba(247,207,87,0.5) 70%)',
                    backgroundPosition: 'center',
                    animation: `${notify} 3s ease-in-out infinite`,
                  },
              ]}
            />
          );
        })}
      {isLoggedIn &&
        iconGroup.map((action, index) => {
          const position = getIconPos(index, iconGroup.length, false);
          return (
            <SpeedDialAction
              key={action.id}
              FabProps={{
                size: 'medium',
              }}
              tooltipTitle={action.label}
              onClick={(e) => navigate(action.path, 'internal', true).onClick(e)}
              icon={
                <SvgIcon
                  component={action.icon}
                  fontSize="large"
                  sx={[
                    { color: 'primary.light' },
                    location.pathname === action.path && { color: 'success.dark' },
                    action.disabled === true && { color: 'secondary.dark' },
                  ]}
                />
              }
              sx={[
                {
                  position: 'absolute',
                  bgcolor: 'transparent',
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(8,22,80) 10%, rgba(14,35,141,0.5) 70%)',
                },
                { ...position },
                location.pathname === action.path && {
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(24, 252, 252, 1) 10%, rgba(121, 192, 244, 0.5) 70%)',
                  backgroundPosition: 'center',
                  animation: `${activeButton} 3s ease-in-out infinite`,
                },
                action.disabled === true && {
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(0,30,100) 15%, rgba(0, 73, 130,0.8) 70%)',
                },
              ]}
            />
          );
        })}
      {!isLoggedIn &&
        loginButtons.map((action, index) => {
          const position = getIconPos(index, 2, true);
          return (
            <SpeedDialAction
              key={action.id}
              icon={React.cloneElement(action.icon as JSX.Element, {
                fontSize: 'large',
              })}
              onClick={onClick}
              sx={[
                {
                  position: 'absolute',
                  bgcolor: 'transparent',
                  backgroundImage:
                    'radial-gradient(circle at center, rgba(8,22,80) 10%, rgba(14,35,141,0.5) 70%)',
                },
                { ...position },
              ]}
            />
          );
        })}
    </SpeedDial>
  );
};
