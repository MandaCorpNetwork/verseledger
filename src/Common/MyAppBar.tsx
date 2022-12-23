import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
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

export const MyAppBar: React.FC<unknown> = () => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchor);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchor(null);
  };

  const menuId = 'primary-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sx: 'none', sm: 'block' } }}
          >
            Verse Ledger
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
              <Badge badgeContent={23} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
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
