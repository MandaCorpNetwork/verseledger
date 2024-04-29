import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  bindMenu,
  bindTrigger,
  PopupState,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LocationSelection } from '@/Common/LocationSelection';

import Station from '../Assets/media/Station.svg?url';
import { FleetIcon } from './Filters/CustomIcons';

export const VLAppBar: React.FC<unknown> = () => {
  const profilePopupState: PopupState = usePopupState({
    variant: 'popover',
    popupId: 'profileNav',
  });
  //const menuId = 'primary-account-menu';

  const [anchorE1, setAnchorE1] = useState<HTMLElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };
  //Location Button Dropdown Interaction

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
  const navigate = useNavigate();
  function handleLogoClick() {
    navigate('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
        <Toolbar>
          <IconButton component="div" sx={{}} onClick={handleLogoClick}>
            {/*{VerseLogo()}*/}
            <img src={logoRandom()} alt="Verse Logo" />
          </IconButton>
          <FleetIcon color="secondary" fontSize="large" />
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{ marginRight: '10%' }} onClick={handleClick}>
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
              <LocationSelection />
            </Popover>
          </Button>
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
