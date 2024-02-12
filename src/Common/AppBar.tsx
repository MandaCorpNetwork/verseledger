import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { Typography, Popover, Autocomplete } from '@mui/material';
import { Box } from '@mui/system';
import {
  bindMenu,
  bindTrigger,
  PopupState,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React from 'react';
import Station from '../Assets/media/Station.svg?url';
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
    return `../Assets/media/VerseLogos/verselogo-${i}.png`;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
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
          <IconButton sx={{ marginRight: '25%' }}>
            <img src={Station} alt="Location-Select" />
            <Popover
              id="test-menu"
              keepMounted
              open={Boolean(anchorE1)}
              anchorEl={anchorE1}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Autocomplete
                multiple
                limitTags={2}
                options={locationTestDB}
                getOptionLabel={(option) => option.location}
                renderInput={(params) => (
                  <TextField {...params} label="Locations" placeholder="Location" />
                )}
              />
            </Popover>
          </IconButton>
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

const locationTestDB = [
  { star: 'Stanton', body: 'Hurston', location: 'Loreville' },
  { star: 'Stanton', body: 'Hurston', location: 'Everus Harbor' },
  { star: 'Stanton', body: 'Aberdeen', location: 'Klecher' },
  { star: 'Stanton', body: 'Hurston', location: `Cutter's Rig` },
  { star: 'Stanton', body: 'Hurston', location: `Finn's Folly` },
  { star: 'Stanton', body: 'Hurston', location: 'HDES Calthrope' },
];
