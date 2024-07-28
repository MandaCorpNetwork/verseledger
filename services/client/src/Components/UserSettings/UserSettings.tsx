import GlassBox from '@Common/Components/Boxes/GlassBox';
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
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSound } from '@Utils/Hooks/useSound';
import React from 'react';

type UserSettingsProps = {
  open: boolean;
  onClose: () => void;
};

const settingsList = ['Profile', 'Security', 'Sounds', 'Application'];

export const UserSettings: React.FC<UserSettingsProps> = ({ open, onClose }) => {
  const playSound = useSound();
  const [selectedSetting, setSelectedSetting] = React.useState<string>('Profile');

  const handleSettingSelection = React.useCallback(
    (setting: string) => {
      if (selectedSetting !== setting) {
        playSound('clickMain');
        setSelectedSetting(setting);
      } else {
        playSound('denied');
      }
    },
    [selectedSetting],
  );
  const DrawerList = (
    <Box>
      <List>
        {settingsList.map((text) => (
          <ListItem key={text} disablePadding onMouseEnter={() => playSound('hover')}>
            <ListItemButton onClick={() => handleSettingSelection(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
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
            '& .MuiDrawer-paper': {
              position: 'relative',
              width: '150px',
              boxSizing: 'border-box',
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
          <Grow in={true}>
            <GlassBox sx={{ minHeight: '100%', minWidth: '100%' }}></GlassBox>
          </Grow>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
