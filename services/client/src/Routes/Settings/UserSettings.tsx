import '@Assets/Css/ripple.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { AppDock } from '@Common/AppDock/AppDock';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { DepressedListButton } from '@Common/Components/Lists/DepressedListButton';
import { MobileDock } from '@Common/MobileDock/MobileDock';
import { SupportBar } from '@Components/Home/SupportBar';
import { ApplicationSettings } from '@Components/User/UserSettings/Application';
import { DeveloperSettings } from '@Components/User/UserSettings/DeveloperSettings';
import { GraphicsSettings } from '@Components/User/UserSettings/Graphics';
import { NotificationSettings } from '@Components/User/UserSettings/Notifications';
import { ProfileSettings } from '@Components/User/UserSettings/Profile';
import { SecuritySettings } from '@Components/User/UserSettings/Security';
import { SoundSettings } from '@Components/User/UserSettings/Sounds';
import { Close } from '@mui/icons-material';
import {
  Box,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';

//TODO: Fix Animations

const settingsList = [
  'Profile',
  'Security',
  'Developer',
  'Sounds',
  'Graphics',
  'Application',
  'Notifications',
] as const;

type settingsListItem = (typeof settingsList)[number];

export const UserSettings: React.FC = () => {
  const sound = useSoundEffect();
  const [selectedSetting, setSelectedSetting] =
    React.useState<settingsListItem>('Profile');
  const [_, setCurrentSetting] = React.useState<string>('Profile');
  const [transitioning, setTransitioning] = React.useState<boolean>(false);
  const isMobile = useIsMobile();

  const settingsPageRender = React.useCallback(() => {
    switch (selectedSetting) {
      case 'Profile':
        return <ProfileSettings />;
      case 'Developer':
        return <DeveloperSettings onClose={() => {}} />;
      case 'Security':
        return <SecuritySettings />;
      case 'Sounds':
        return <SoundSettings />;
      case 'Graphics':
        return <GraphicsSettings />;
      case 'Application':
        return <ApplicationSettings />;
      case 'Notifications':
        return <NotificationSettings />;
    }
  }, [selectedSetting]);

  const handleSettingSelection = React.useCallback(
    (setting: settingsListItem) => {
      if (selectedSetting !== setting) {
        sound.playSound('clickMain');
        setTransitioning(true);
        setSelectedSetting(setting);
      } else {
        sound.playSound('denied');
      }
    },
    [sound, selectedSetting],
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
    <Box>
      <List>
        {settingsList.map((text) => (
          <ListItem
            key={text}
            disablePadding
            onMouseEnter={() => sound.playSound('hover')}
          >
            <DepressedListButton
              onClick={() => handleSettingSelection(text)}
              selected={selectedSetting === text}
              TouchRippleProps={{ className: 'dark-ripple' }}
            >
              <ListItemText primary={text} />
            </DepressedListButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <VLViewport sx={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Typography variant="h4">User Settings</Typography>
        <IconButton sx={{ ml: 'auto' }} size="large" onClick={() => {}}>
          <Close fontSize="large" />
        </IconButton>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Drawer
          variant="persistent"
          open={true}
          sx={{
            position: 'relative',
            width: '150px',
            height: '100%',
            boxShadow:
              '2px 4px 4px rgba(0,1,19,0.4),3px 3px 4px rgba(0,1,19,.3), 4px 4px 12px rgba(0,1,19,.2), 5px 5px 16px rgba(0,1,19,.1)',
            borderRadius: '10px',
            '& .MuiDrawer-paper': {
              position: 'relative',
              width: '150px',
              boxSizing: 'border-box',
              backgroundColor: 'rgba(14,35,141,0.8)',
              backgroundImage:
                'linear-gradient(145deg, rgba(33,150,243,0.1), rgba(0,1,19,0.2))',
              boxShadow:
                'inset 0px 1px 2px rgba(33,150,243,0.2), inset 0 -1px 2px rgba(0,1,19,0.2), 0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(33,150,243,0.2)',
              border: '2px solid',
              borderLeft: 'none',
              borderRadius: '10px',
              borderColor: 'primary.main',
              transition: 'all 0.3s ease-in-out',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundImage:
                  'radial-gradient(circle, rgba(0,1,19,0.2) 1px, transparent 1px)',
                backgroundSize: '4px 4px',
                opacity: 0.6,
              },
              // '&:after': {
              //   content: '""',
              //   position: 'absolute',
              //   top: 10,
              //   left: 5,
              //   width: 'calc(100% - 10px)',
              //   height: 'calc(100% - 20px)',
              //   border: '1px solid rgba(33,150,243,0.2)',
              //   borderRadius: '8px',
              // },
              '&:hover': {
                backgroundImage:
                  'linear-gradient(125deg, rgba(0,1,19,0.25), rgba(0,30,100,0.3))',
                borderColor: 'primary.light',
                boxShadow:
                  'inset 0px 1px 2px rgba(33,150,243,.2), inset 0 -1px 2px rgba(0,1,19,.2)',
                '&:before': {
                  backgroundImage:
                    'radial-gradient(circle, rgba(33,150,252,0.2) 1px, transparent 1px)',
                },
              },
            },
            '&:hover': {
              boxShadow:
                '2px 2px 6px 6px rgba(0,1,19,0.3), 2px 4px 8px 8px rgba(0,1,19,.3), 4px 6px 12px 12px rgba(0,1,19,.2), 4px 8px 16px 24px rgba(0,1,19,.1)',
            },
          }}
        >
          {DrawerList}
        </Drawer>
        <Box
          data-testid="UserSettings-Settings__DisplayWrapper"
          sx={{
            flexGrow: 1,
            pl: '2em',
          }}
        >
          <Grow
            in={!transitioning}
            timeout="auto"
            easing={{ enter: 'ease-in-out', exit: 'ease-out' }}
            style={{ transformOrigin: 'center' }}
          >
            <Box sx={{ width: '100%', height: '100%' }}>{settingsPageRender()}</Box>
          </Grow>
        </Box>
      </div>
      <Box
        sx={{
          mt: 'auto',
          mx: 'auto',
          mb: '20px',
          gap: '.5em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!isMobile && <AppDock />}
        {isMobile && <MobileDock bottom hCenter />}
        {!isMobile && <SupportBar />}
      </Box>
    </VLViewport>
  );
};
