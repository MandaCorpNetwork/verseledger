import { AccessTime } from '@mui/icons-material';
import { Button, Checkbox, Menu, MenuItem, Typography } from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export const AccessTimeFilterMenuDropdown: React.FC<unknown> = () => {
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
    '10minutes',
    '10-30minutes',
    '30-60minutes',
    '1-5hours',
    '5-12hours',
    '12-24hours',
    '24plushours',
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
      <AccessTime onClick={handleClick} sx={{ color: 'secondary.main', width: '55px' }} />
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
        <MenuItem value={'all'} onClick={handleAll}>
          <Checkbox checked={checked.includes('all')} />
          <Typography>{'All'}</Typography>
        </MenuItem>
        <MenuItem value={'10minutes'} onClick={() => handleCheck('10minutes')}>
          <Checkbox checked={checked.includes('10minutes')} />
          <Typography>{'> 10 Minutes'}</Typography>
        </MenuItem>
        <MenuItem value={'10-30minutes'} onClick={() => handleCheck('10-30minutes')}>
          <Checkbox checked={checked.includes('10-30minutes')} />
          <Typography>{'10-30 Minutes'}</Typography>
        </MenuItem>
        <MenuItem value={'30-60minutes'} onClick={() => handleCheck('30-60minutes')}>
          <Checkbox checked={checked.includes('30-60minutes')} />
          <Typography>{'30-60 Minutes'}</Typography>
        </MenuItem>
        <MenuItem value={'1-5hours'} onClick={() => handleCheck('1-5hours')}>
          <Checkbox checked={checked.includes('1-5hours')} />
          <Typography>{'1-5 Hours'}</Typography>
        </MenuItem>
        <MenuItem value={'5-12hours'} onClick={() => handleCheck('5-12hours')}>
          <Checkbox checked={checked.includes('5-12hours')} />
          <Typography>{'5-12 Hours'}</Typography>
        </MenuItem>
        <MenuItem value={'12-24hours'} onClick={() => handleCheck('12-24hours')}>
          <Checkbox checked={checked.includes('12-24hours')} />
          <Typography>{'12-24 Hours'}</Typography>
        </MenuItem>
        <MenuItem value={'24plushours'} onClick={() => handleCheck('24plushours')}>
          <Checkbox checked={checked.includes('24plushours')} />
          <Typography>{'24+ Hours'}</Typography>
        </MenuItem>
      </Menu>
    </Button>
  );
};
