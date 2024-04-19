import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

import { useFilters } from '@/Utils/Hooks/useFilters';

const menuValues = [
  { archetype: 'all', value: 'all', label: 'All' },
  { archetype: 'logistics', value: 'transport', label: 'Transport' },
  { archetype: 'logistics', value: 'hauling', label: 'Hauling' },
  { archetype: 'logistics', value: 'manage', label: 'Manage' },
  { archetype: 'medical', value: 'trauma', label: 'Trauma' },
  { archetype: 'medical', value: 'on-call', label: 'On-Call' },
  { archetype: 'security', value: 'escort', label: 'Escort' },
  { archetype: 'security', value: 'bounty', label: 'Bounty' },
  { archetype: 'security', value: 'qrf', label: 'QRF' },
  { archetype: 'security', value: 'asset-protection', label: 'Asset Protection' },
  { archetype: 'security', value: 'attache', label: 'Attache' },
  { archetype: 'salvage', value: 'collection', label: 'Collection' },
  { archetype: 'salvage', value: 'procurement', label: 'Procurement' },
  { archetype: 'industry', value: 'mining', label: 'Mining' },
  { archetype: 'industry', value: 'refining', label: 'Refining' },
  { archetype: 'industry', value: 'manufacturing', label: 'Manufacturing' },
  { archetype: 'industry', value: 'scouting', label: 'Scouting' },
  { archetype: 'RRR', value: 'refuel', label: 'Refuel' },
  { archetype: 'RRR', value: 'rearm', label: 'Rearm' },
  { archetype: 'RRR', value: 'repair', label: 'Repair' },
  { archetype: 'fleet', value: 'crewman', label: 'Crewman' },
  { archetype: 'fleet', value: 'outsourcing', label: 'Outsourcing' },
  { archetype: 'proxy', value: 'middleman', label: 'Middleman' },
  { archetype: 'proxy', value: 'other', label: 'Other' },
];

export const SubTypeFilter: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useFilters();
  const handleChange = (event: React.SyntheticEvent, newValue: { value: string }[]) => {
    const values = newValue.map((option) => option.value);
    // @ts-expect-error TS2322: Type 'string[]' is not assignable to type 'string | undefined', works as expected
    setFilters('subType', values);
  };
  //const accessTime = filters.get('accessTime');

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={menuValues}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Sub Types" multiline={false} />
      )}
      groupBy={(option) =>
        option.archetype?.charAt(0).toUpperCase() + option.archetype?.slice(1)
      }
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
