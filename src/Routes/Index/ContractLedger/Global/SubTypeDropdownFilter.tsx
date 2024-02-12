import { AutoAwesomeMotion } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
  TextField,
  ListSubheader,
  Popover,
} from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export const SubTypeDropdownFilter: React.FC<unknown> = () => {
  const [anchorE1, setAnchorE1] = useState(null);

  const handleClick: MouseEventHandler<SVGSVGElement> = (e: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  const menuValues = [
    { type: 'all', values: ['all'] },
    { type: 'logistics', values: ['transport', 'hauling', 'manage'] },
    { type: 'medical', values: ['trauma', 'on-call'] },
    {
      type: 'security',
      values: ['escort', 'bounty', 'qrf', 'asset-protection', 'attache'],
    },
    { type: 'salvage', values: ['collection', 'procurement'] },
    { type: 'industry', values: ['mining', 'refining', 'manufacturing', 'scouting'] },
    { type: 'rrr', values: ['rearm', 'refuel', 'repair'] },
    { type: 'fleet', values: ['crewman', 'outsourcing'] },
    { type: 'proxy', values: ['middleman', 'other'] },
  ];

  return (
    <Button sx={{ color: 'text.primary' }}>
      <AutoAwesomeMotion
        onClick={handleClick}
        sx={{ color: 'secondary.main', width: '55px' }}
      />
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
          renderInput={(params) => (
            <TextField {...params} label="Sub Types" placeholder="Sub Type" />
          )}
          options={menuValues}
          getOptionLabel={(option) => option.type}
          renderOption={(option) => (
            <div>
              <ListSubheader>{option.type}</ListSubheader>
              {option.values?.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                  <Checkbox />
                </MenuItem>
              ))}
            </div>
          )}
        ></Autocomplete>
      </Popover>
    </Button>
  );
};

//Needs to pull the different subtypes of Contract Types from menuValues to render in all type names as ListSubheaders with their corresponding subtypes pulling from the values rendering in as menuitems
