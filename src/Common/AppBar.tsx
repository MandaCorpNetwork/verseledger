import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  bindMenu,
  bindTrigger,
  PopupState,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React from 'react';
//import { VerseLogo } from './VerseLogo';
//import { useHistory } from 'react-router-dom'; Implement on Line 41 Fix

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

  function logoRandom() {
    const i = Math.floor(Math.random() * 11);
    return `../Assets/VerseLogos/verselogo-${i}.png`;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.dark'}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sx: 'none', sm: 'block' } }}
          >
            {/*{VerseLogo()}*/}
            <img src={logoRandom()} alt="Verse Logo" />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new messages" color="inherit">
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
