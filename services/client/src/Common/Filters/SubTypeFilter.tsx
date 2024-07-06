// SubTypeFilter.tsx
import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

const menuValues = [
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

type SubTypeFilterProps = {
  size: 'small' | 'medium';
};

export const SubTypeFilter: React.FC<SubTypeFilterProps> = ({ size }) => {
  const [filters, setFilters] = useURLQuery();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (_event: React.SyntheticEvent, newValue: { value: string }[]) => {
    setFilters(
      QueryNames.Subtype,
      newValue.map((v) => v.value),
    );
  };

  const currentFilterValues = filters.getAll(QueryNames.Subtype);

  return (
    <Autocomplete
      multiple
      renderTags={() => null}
      autoHighlight
      options={menuValues}
      value={menuValues.filter((i) => currentFilterValues.includes(i.value))}
      onChange={handleChange}
      size={size}
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
    />
  );
};
