import { Group } from '@mui/icons-material';
import { IconButton, Checkbox, Menu, MenuItem, Typography } from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';

export const ContractOwnerTypeFilterMenuDropdown: React.FC<unknown> = () => {
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
    'individual',
    '1-5members',
    '5-50members',
    '50-200members',
    '200-500members',
    '500plusmembers',
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
    console.log('ContractOwnerTypeFilterValues: ', checked);
  });

  return (
    <IconButton sx={{ color: 'text.primary' }}>
      <Group onClick={handleClick} sx={{ color: 'secondary.main', width: '55px' }} />
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
        <MenuItem value={'individual'} onClick={() => handleCheck('individual')}>
          <Checkbox checked={checked.includes('individual')} />
          <Typography>{'Individual'}</Typography>
        </MenuItem>
        <MenuItem value={'1-5members'} onClick={() => handleCheck('1-5members')}>
          <Checkbox checked={checked.includes('1-5members')} />
          <Typography>{'Small Group'}</Typography>
        </MenuItem>
        <MenuItem value={'5-50members'} onClick={() => handleCheck('5-50members')}>
          <Checkbox checked={checked.includes('5-50members')} />
          <Typography>{'Small Business'}</Typography>
        </MenuItem>
        <MenuItem value={'50-200members'} onClick={() => handleCheck('50-200members')}>
          <Checkbox checked={checked.includes('50-200members')} />
          <Typography>{'Small Enterprise'}</Typography>
        </MenuItem>
        <MenuItem value={'200-500members'} onClick={() => handleCheck('200-500members')}>
          <Checkbox checked={checked.includes('200-500members')} />
          <Typography>{'Corporation'}</Typography>
        </MenuItem>
        <MenuItem value={'500plusmembers'} onClick={() => handleCheck('500plusmembers')}>
          <Checkbox checked={checked.includes('500plusmembers')} />
          <Typography>{'Conglomerant'}</Typography>
        </MenuItem>
      </Menu>
    </IconButton>
  );
};
