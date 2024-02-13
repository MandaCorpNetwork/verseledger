import { Autocomplete, Checkbox, MenuItem, TextField } from '@mui/material';
import React from 'react';

export const SubTypeDropdownFilter: React.FC<unknown> = () => {
  const menuValues = [
    { type: 'all', value: 'all' },
    { type: 'logistics', value: 'transport' },
    { type: 'logistics', value: 'hauling' },
    { type: 'logistics', value: 'manage' },
    { type: 'medical', value: 'trauma' },
    { type: 'medical', value: 'on-call' },
    { type: 'security', values: 'escort' },
    { type: 'security', value: 'bounty' },
    { type: 'security', value: 'qrf' },
    { type: 'security', value: 'asset-protection' },
    { type: 'security', value: 'attache' },
    { type: 'salvage', value: 'collection' },
    { type: 'salvage', value: 'procurement' },
    { type: 'industry', value: 'mining' },
    { type: 'industry', value: 'refining' },
    { type: 'industry', value: 'manufacturing' },
    { type: 'industry', value: 'scouting' },
    { type: 'RRR', value: 'refuel' },
    { type: 'RRR', value: 'rearm' },
    { type: 'RRR', value: 'repair' },
    { type: 'fleet', value: 'crewman' },
    { type: 'fleet', value: 'outsourcing' },
    { type: 'proxy', value: 'middleman' },
    { type: 'proxy', value: 'other' },
  ];

  return (
    <Autocomplete
      sx={{ width: 300, color: '#020226' }}
      multiple
      options={menuValues}
      renderInput={(params) => (
        <TextField {...params} label="Sub Types" placeholder="Sub Type" />
      )}
      groupBy={(option) =>
        (option.type)?.charAt(0).toUpperCase() + (option.type)?.slice(1)}
      getOptionLabel={(option) =>
        (option.value)?.charAt(0).toUpperCase() + (option.value)?.slice(1)
      }
      renderOption={(props, option, { selected }) => (
        <MenuItem {...props} sx={{ display: 'flex' }}>
          {option.value}
          <Checkbox sx={{ justifyContent: 'flex-end' }} checked={selected} />
        </MenuItem>
      )}
    />
  );
};

//Needs to pull the different subtypes of Contract Types from menuValues to render in all type names as ListSubheaders with their corresponding subtypes pulling from the values rendering in as menuitems
