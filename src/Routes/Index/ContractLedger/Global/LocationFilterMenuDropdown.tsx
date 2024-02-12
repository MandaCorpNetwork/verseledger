import { SatelliteAlt, CheckIcon, CloseIcon, MultipleStop } from "@mui/icons-material";
import { IconButton, Box, Autocomplete, TextField, Popover } from "@mui/material";
import React, { MouseEventHandler, useEffect, useState, InputWrapper } from 'react';

export const LocationFilterMenuDropdown: React.FC<unknown> = () => {
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
      <SatelliteAlt onClick={handleClick} sx={{ color: 'secondary.main', width: '55px' }} />
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
            <TextField { ...params} label='Locations' placeholder='Location' />
          )}
        />
      </Popover>
    </IconButton>
  );
};

//Test DB for Location Filter
const locationTestDB = [
  { star: 'Stanton', body: 'Hurston', location: 'Loreville' },
  { star: 'Stanton', body: 'Hurston', location: 'Everus Harbor' },
  { star: 'Stanton', body: 'Aberdeen', location: 'Klecher' },
  { star: 'Stanton', body: 'Hurston', location: `Cutter's Rig` },
  { star: 'Stanton', body: 'Hurston', location: `Finn's Folly` },
  { star: 'Stanton', body: 'Hurston', location: 'HDES Calthrope' },
];