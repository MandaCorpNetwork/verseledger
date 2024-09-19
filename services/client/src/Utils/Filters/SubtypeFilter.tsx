// SubTypeFilter.tsx
import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
// import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import React, { useMemo } from 'react';

import { useSoundEffect } from '@/AudioManager';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

const menuValues = [
  { archetype: 'logistics', value: 'Transport', label: 'Transport' },
  { archetype: 'logistics', value: 'Hauling', label: 'Hauling' },
  { archetype: 'logistics', value: 'Manage', label: 'Manage' },
  { archetype: 'medical', value: 'Trauma', label: 'Trauma' },
  { archetype: 'medical', value: 'On-Call', label: 'On-Call' },
  { archetype: 'security', value: 'Escort', label: 'Escort' },
  { archetype: 'security', value: 'Bounty', label: 'Bounty' },
  { archetype: 'security', value: 'QRF', label: 'QRF' },
  { archetype: 'security', value: 'Asset-Protection', label: 'Asset Protection' },
  { archetype: 'security', value: 'Attache', label: 'Attache' },
  { archetype: 'salvage', value: 'Collection', label: 'Collection' },
  { archetype: 'salvage', value: 'Procurement', label: 'Procurement' },
  { archetype: 'industry', value: 'Mining', label: 'Mining' },
  { archetype: 'industry', value: 'Refining', label: 'Refining' },
  { archetype: 'industry', value: 'Manufacturing', label: 'Manufacturing' },
  { archetype: 'industry', value: 'Scouting', label: 'Scouting' },
  { archetype: 'RRR', value: 'Refuel', label: 'Refuel' },
  { archetype: 'RRR', value: 'Rearm', label: 'Rearm' },
  { archetype: 'RRR', value: 'Repair', label: 'Repair' },
  { archetype: 'fleet', value: 'Crewman', label: 'Crewman' },
  { archetype: 'fleet', value: 'Outsourcing', label: 'Outsourcing' },
  { archetype: 'exploration', value: 'Locate', label: 'Locate' },
  { archetype: 'exploration', value: 'Charting', label: 'Charting' },
  { archetype: 'proxy', value: 'Middleman', label: 'Middleman' },
  { archetype: 'proxy', value: 'Redacted', label: 'Redacted' },
];

type SubTypeFilterProps = {
  size: 'small' | 'medium';
};

export const SubTypeFilter: React.FC<SubTypeFilterProps> = ({ size }) => {
  const { playSound } = useSoundEffect();
  const { searchParams, setFilters } = useURLQuery();

  const currentFilterValues = useMemo(() => {
    const subtypeFilters = searchParams.getAll(QueryNames.Subtype);
    return Array.isArray(subtypeFilters) ? subtypeFilters : [subtypeFilters];
  }, [searchParams]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (_event: React.SyntheticEvent, newValue: { value: string }[]) => {
    playSound('clickMain');
    setFilters(
      QueryNames.Subtype,
      newValue.map((v) => v.value),
    );
  };

  return (
    <Autocomplete
      data-testid="SubTypeFilter__Autocomplete"
      multiple
      renderTags={() => null}
      autoHighlight
      options={menuValues}
      value={menuValues.filter((i) => currentFilterValues.includes(i.value))}
      onChange={handleChange}
      size={size}
      renderInput={(params) => (
        <TextField {...params} label="Sub Types" multiline={false} color="secondary" />
      )}
      groupBy={(option) =>
        option.archetype?.charAt(0).toUpperCase() + option.archetype?.slice(1)
      }
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          sx={{ display: 'flex' }}
          onMouseEnter={() => playSound('hover')}
        >
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
