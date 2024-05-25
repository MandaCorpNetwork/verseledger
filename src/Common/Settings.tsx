import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';

type UserSettingsProps = {
  open: boolean;
  onClose: () => void;
};

export const UserSettings: React.FC<UserSettingsProps> = ({ open, onClose }) => {
  return (
    <Dialog fullScreen open={open} sx={{ backdropFilter: 'blur(10px)' }}>
      <DialogTitle sx={{ display: 'flex' }}>
        <Typography variant="h4">User Settings</Typography>
        <IconButton sx={{ ml: 'auto' }} size="large" onClick={onClose}>
          <Close fontSize="large" />
        </IconButton>
      </DialogTitle>
    </Dialog>
  );
};
