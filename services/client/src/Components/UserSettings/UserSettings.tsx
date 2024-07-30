import '@Assets/Css/ripple.scss';

import { DepressedListButton } from '@Common/Components/Lists/DepressedListButton';
import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

import { ApplicationSettings } from './Application';
import { GraphicsSettings } from './Graphics';
import { NotificationSettings } from './Notifications';
import { ProfileSettings } from './Profile';
import { SecuritySettings } from './Security';
import { SoundSettings } from './Sounds';

type UserSettingsProps = {
  open: boolean;
  onClose: () => void;
};

const settingsList = [
  'Profile',
  'Security',
  'Sounds',
  'Graphics',
  'Application',
  'Notifications',
];

export const UserSettings: React.FC<UserSettingsProps> = ({ open, onClose }) => {
  const { playSound } = useSoundEffect();
  const [selectedSetting, setSelectedSetting] = React.useState<string>('Profile');
  const [currentSetting, setCurrentSetting] = React.useState<string>('Profile');
  const [transitioning, setTransitioning] = React.useState<boolean>(false);

  const settingsPageRender = React.useCallback(() => {
    switch (selectedSetting) {
      case 'Profile':
        return <ProfileSettings />;
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
  }, [currentSetting]);

  const handleSettingSelection = React.useCallback(
    (setting: string) => {
      if (selectedSetting !== setting) {
        playSound('clickMain');
        setTransitioning(true);
        setSelectedSetting(setting);
      } else {
        playSound('denied');
      }
    },
    [selectedSetting],
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
          <ListItem key={text} disablePadding onMouseEnter={() => playSound('hover')}>
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
    <Dialog
      fullScreen
      open={open}
      sx={{ backdropFilter: 'blur(10px)' }}
      PaperProps={{ sx: { bgcolor: 'rgba(8,29,68,0.6)' } }}
    >
      <DialogTitle sx={{ display: 'flex' }}>
        <Typography variant="h4">User Settings</Typography>
        <IconButton sx={{ ml: 'auto' }} size="large" onClick={onClose}>
          <Close fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', pl: '0', flexDirection: 'row' }}>
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
      </DialogContent>
    </Dialog>
  );
};
