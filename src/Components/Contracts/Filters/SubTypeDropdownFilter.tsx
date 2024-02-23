import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

type SubTypeFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const SubTypeDropdownFilter: React.FC<SubTypeFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const menuValues = [
    { type: 'all', value: 'all', label: 'All' },
    { type: 'logistics', value: 'transport', label: 'Transport' },
    { type: 'logistics', value: 'hauling', label: 'Hauling' },
    { type: 'logistics', value: 'manage', label: 'Manage' },
    { type: 'medical', value: 'trauma', label: 'Trauma' },
    { type: 'medical', value: 'on-call', label: 'On-Call' },
    { type: 'security', value: 'escort', label: 'Escort' },
    { type: 'security', value: 'bounty', label: 'Bounty' },
    { type: 'security', value: 'qrf', label: 'QRF' },
    { type: 'security', value: 'asset-protection', label: 'Asset Protection' },
    { type: 'security', value: 'attache', label: 'Attache' },
    { type: 'salvage', value: 'collection', label: 'Collection' },
    { type: 'salvage', value: 'procurement', label: 'Procurement' },
    { type: 'industry', value: 'mining', label: 'Mining' },
    { type: 'industry', value: 'refining', label: 'Refining' },
    { type: 'industry', value: 'manufacturing', label: 'Manufacturing' },
    { type: 'industry', value: 'scouting', label: 'Scouting' },
    { type: 'RRR', value: 'refuel', label: 'Refuel' },
    { type: 'RRR', value: 'rearm', label: 'Rearm' },
    { type: 'RRR', value: 'repair', label: 'Repair' },
    { type: 'fleet', value: 'crewman', label: 'Crewman' },
    { type: 'fleet', value: 'outsourcing', label: 'Outsourcing' },
    { type: 'proxy', value: 'middleman', label: 'Middleman' },
    { type: 'proxy', value: 'other', label: 'Other' },
  ];

  const handleChange = (event, newValue: string[]) => {
    const values = newValue.map((option) => option.value);
    const newParams = new URLSearchParams();
    newParams.set('subType', values.join(','));
    setSearchParams(newParams);
  };

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={menuValues}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Sub Types" multiline={false} />
      )}
      groupBy={(option) => option.type?.charAt(0).toUpperCase() + option.type?.slice(1)}
      renderOption={(props, option, { selected }) => (
        <MenuItem {...props} sx={{ display: 'flex' }}>
          {option.label}
          {selected && (
            <CheckIcon
              sx={{
                color: 'secondary.main',
                ml: 'auto',
                opacity: 0.6,
                fontSize: '1.2em',
              }}
            />
          )}
        </MenuItem>
      )}
      sx={{
        width: '20%',
      }}
    />
  );
};
