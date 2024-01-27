import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Typography } from '@mui/material';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
  PopupState,
} from 'material-ui-popup-state/hooks';

export const VLAppBar: React.FC<unknown> = () => {
  const profilePopupState: PopupState = usePopupState({
    variant: 'popover',
    popupId: 'profileNav',
  });
  //const menuId = 'primary-account-menu';

  const renderMenu = (
    <Menu {...bindMenu(profilePopupState)}>
      <MenuItem onClick={profilePopupState.close}>
        <Typography color={'black'}>My Account</Typography>
      </MenuItem>
      <MenuItem onClick={profilePopupState.close}>
        <Typography color={'black'}>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const logos = import.meta.glob('../Assets/AppBar/VerseLedgerLogo/*.png').then((logoID) => const logos = logoID.default)

  //Testing for Batch Image import

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sx: 'none', sm: 'block' } }}
          >
            <img src={logos[0]} alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new messages"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 23 new notifications"
              color="inherit"
            >
              <Badge badgeContent={23} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              {...bindTrigger(profilePopupState)}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

