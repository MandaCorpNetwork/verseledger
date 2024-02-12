import { AutoAwesomeMotion } from '@mui/icons-material';
import { Autocomplete, Button, Checkbox, Menu, MenuItem, Typography, TextField } from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export const SubTypeDropdownFilter: React.FC<unknown> = () => {
  const [anchorE1, setAnchorE1] = useState(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleClick: MouseEventHandler<SVGSVGElement> = (e: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  const menuValues = [
    'all',
    'transport',
    'hauling',
    'manage',
    'trauma',
    'on-call',
    'escort',
    'bounty',
    'qrf',
    'asset-protection',
    'attache',
    'collections',
    'procurement',
    'mining',
    'refining',
    'manufacturing',
    'scouting',
    'rearm',
    'refuel',
    'repair',
    'crewman',
    'outsourcing',
    'middleman',
    'other'
  ];

  const handleCheck = (value: string) => {
    setChecked((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleAll = () => {
    setChecked((prev) => {
      if (!selectAll || checked.length !== menuValues.length) {
        return menuValues;
      } else {
        return [];
      }
    });
    setSelectAll((prev) => !prev);
  };

  useEffect(() => {
    console.log('AccessTimeFilterValues: ', checked);
  });

  return (
    <Button sx={{ color: 'text.primary' }}>
      <AutoAwesomeMotion onClick={handleClick} sx={{ color: 'secondary.main', width: '55px' }} />
      <Autocomplete
        renderInput={(params) => (
          <TextField { ...params} label='Sub Types' placeholder='Sub Type' />
        )}
      ></Autocomplete>
    </Button>
  );
};

//Needs to pull the different subtypes of Contract Types from ContractLedgerLoopSubType.tsx possibly to render in all categories as ListSubheaders with their corresponding subtypes, and when a LoopButton is clicked on only the ListSubheader that corresponds should be rendered.
