import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

type UserSettingsProps = {
  open: boolean;
  onClose: () => void;
};

const settingsList = ['Profile', 'Security', 'Application'];

export const UserSettings: React.FC<UserSettingsProps> = ({ open, onClose }) => {
  const DrawerList = (
    <Box>
      <List>
        {settingsList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Dialog fullScreen open={open} sx={{ backdropFilter: 'blur(10px)' }}>
      <DialogTitle sx={{ display: 'flex' }}>
        <Typography variant="h4">User Settings</Typography>
        <IconButton sx={{ ml: 'auto' }} size="large" onClick={onClose}>
          <Close fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Drawer variant="persistent" open={true}>
          {DrawerList}
        </Drawer>
      </DialogContent>
    </Dialog>
  );
};
//Drawer needs to disablePortal
