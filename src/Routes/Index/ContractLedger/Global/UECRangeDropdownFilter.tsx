import { IconButton, Menu, MenuItem, Typography, TextField, InputAdornment } from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';

export const UECRangeDropdownFilter: React.FC<unknown> = () => {
  const [anchorE1, setAnchorE1] = useState(null);

  const handleClick: MouseEventHandler<SVGSVGElement> = (e: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <IconButton sx={{ color: 'text.primary' }}>
      <Typography
        onClick={handleClick}
        sx={{ color: 'secondary.main', fontSize: '1.5em' }}
      >
        ¤
      </Typography>
      <Menu
        id="test-menu"
        keepMounted
        open={Boolean(anchorE1)}
        anchorEl={anchorE1}
        onClose={handleClose}
        MenuListProps={{
          sx: { backgroundColor: 'primary.main' },
        }}
      >
        <MenuItem>
          <TextField
            InputProps={{
              startAdornment: <InputAdornment position="start">¤
              </InputAdornment>,
            }}
          />
        </MenuItem>
        <Typography>To</Typography>
        <MenuItem>
          <TextField 
            InputProps={{
              startAdornment: <InputAdornment position="start">¤
              </InputAdornment>,
            }}
          />
        </MenuItem>
      </Menu>
    </IconButton>
  );
};
