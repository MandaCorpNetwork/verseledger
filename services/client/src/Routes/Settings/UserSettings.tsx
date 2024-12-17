import '@Assets/Css/ripple.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { AppDisplay } from '@Common/Components/Core/Boxes/AppContainer';
import { VLViewport } from '@Common/Components/Core/Boxes/VLViewport';
import { PanelSelection } from '@Common/Components/Core/Drawers/PanelSelection';
import { MaskedVideo } from '@Common/Components/Functional/Applcation/Media/MaskedVideo';
import { DepressedListButton } from '@CommonLegacy/Components/Lists/DepressedListButton';
import { BetaSettings } from '@ComponentsLegacy/User/UserSettings/Beta';
import { DeveloperSettings } from '@ComponentsLegacy/User/UserSettings/DeveloperSettings';
import { GraphicsSettings } from '@ComponentsLegacy/User/UserSettings/Graphics';
import { NotificationSettings } from '@ComponentsLegacy/User/UserSettings/Notifications';
import { ProfileSettings } from '@ComponentsLegacy/User/UserSettings/Profile';
import { SecuritySettings } from '@ComponentsLegacy/User/UserSettings/Security';
import { SoundSettings } from '@ComponentsLegacy/User/UserSettings/Sounds';
import {
  Box,
  Grow,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserSettings } from '@Redux/Slices/Auth/auth.selectors';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import type { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

//TODO: Fix Animations

const settingsList = [
  'Profile',
  'Security',
  'Notifications',
  'Beta',
  'Sounds',
  'Graphics',
  'Developer',
] as const;

type SettingsListItem = (typeof settingsList)[number];

export const UserSettings: React.FC = () => {
  const { tab } = useParams();
  const nav = useNav();
  const navigate = useNavigate();
  const sound = useSoundEffect();
  const theme = useTheme();
  const themeExtend = useDynamicTheme();
  const [selectedSetting, _setSelectedSetting] =
    React.useState<SettingsListItem>('Profile');
  const [_, setCurrentSetting] = React.useState<string>('Profile');
  const [transitioning, setTransitioning] = React.useState<boolean>(false);

  const layout = React.useMemo(() => {
    const drawerList = themeExtend.layout('UserSettings.DrawerList');
    const drawerListButton = themeExtend.layout('UserSettings.DrawListButton');
    return { drawerList, drawerListButton };
  }, [themeExtend]);

  const currentSettings = useAppSelector(selectUserSettings);

  React.useEffect(() => {
    if (!tab) {
      const url = '/settings/Profile';
      navigate(url);
    }
  }, [tab, navigate]);

  const settingsPageRender = React.useCallback(() => {
    switch (tab) {
      case 'Profile':
        return <ProfileSettings />;
      case 'Developer':
        return (
          <DeveloperSettings
            onClose={() => {
              //
            }}
          />
        );
      case 'Security':
        return <SecuritySettings />;
      case 'Sounds':
        return <SoundSettings />;
      case 'Graphics':
        return <GraphicsSettings currentSettings={currentSettings as IUserSettings} />;
      case 'Beta':
        return <BetaSettings />;
      case 'Notifications':
        return <NotificationSettings />;
    }
  }, [tab, currentSettings]);

  const handleSettingSelection = React.useCallback(
    (e: React.MouseEvent, setting: SettingsListItem) => {
      if (setting !== tab) {
        sound.playSound('clickMain');
        setTransitioning(true);
        nav(`/settings/${setting}`, 'internal', false).onClick(e);
      } else {
        sound.playSound('denied');
      }
    },
    [tab, sound, nav],
  );

  React.useEffect(() => {
    if (transitioning) {
      const time = setTimeout(() => {
        setCurrentSetting(selectedSetting);
        setTransitioning(false);
      }, 500);
      return () => clearTimeout(time);
    }
  }, [transitioning, selectedSetting]);

  const DrawerList = (
    <List sx={{ display: 'flex', flexDirection: 'column', ...layout.drawerList }}>
      {settingsList.map((text) => (
        <ListItem key={text} disablePadding onMouseEnter={() => sound.playSound('hover')}>
          <DepressedListButton
            onClick={(e) => handleSettingSelection(e, text)}
            selected={tab === text}
            TouchRippleProps={{ className: 'dark-ripple' }}
            sx={layout.drawerListButton}
          >
            <ListItemText primary={text} />
          </DepressedListButton>
        </ListItem>
      ))}
    </List>
  );
  return (
    <VLViewport data-testid="UserSettings__Page_Viewport">
      <AppDisplay
        data-testid="UserSettings__Page_Display"
        style={{ marginLeft: 0, paddingLeft: 0 }}
      >
        {theme.fidelity === 'high' && <MaskedVideo />}
        <Typography variant="h4" sx={{ ml: '0.5em', zIndex: 2 }}>
          User Settings
        </Typography>
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexGrow: 1,
            margin: '1em 0',
            flexDirection: 'row',
            ...(theme.themeType === 'pirateOS' && {
              flexDirection: 'column',
              gap: '1em',
            }),
          })}
        >
          <PanelSelection
            variant="persistent"
            open={true}
            anchor={theme.themeType === 'pirateOS' ? 'top' : 'left'}
            sx={(theme) => ({
              width: '150px',
              '& .MuiDrawer-paper': {
                width: '150px',
              },
              ...(theme.themeType === 'pirateOS' && {
                width: '100%',
                px: '2em',
                '& .MuiDrawer-paper': {
                  width: '100%',
                  px: '0.5em',
                  m: 0,
                },
              }),
            })}
          >
            {DrawerList}
          </PanelSelection>
          <div
            data-testid="UserSettings-Settings__DisplayWrapper"
            style={{
              flexGrow: 1,
              padding: '0 2em',
            }}
          >
            <Grow
              in={!transitioning}
              timeout="auto"
              easing={{ enter: 'ease-in-out', exit: 'ease-out' }}
              style={{ transformOrigin: 'center' }}
              unmountOnExit
              mountOnEnter
            >
              <Box sx={{ width: '100%', height: '100%' }}>{settingsPageRender()}</Box>
            </Grow>
          </div>
        </Box>
        <div
          data-testid="UserSettings-Page__Dock_Spacer"
          style={{
            marginBottom: '150px',
            gap: '.5em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        />
      </AppDisplay>
    </VLViewport>
  );
};
