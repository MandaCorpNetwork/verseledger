import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

import { useFilters } from '@/Components/Contracts/Filters/useFilters';

const menuValues = [
  { value: 'all', label: 'All' },
  { value: '10minutes', label: '10 Minutes' },
  { value: '10-30minutes', label: '10-30 Minutes' },
  { value: '30-60minutes', label: '30-60 Minutes' },
  { value: '1-5hours', label: '1-5 Hours' },
  { value: '5-12hours', label: '5-12 Hours' },
  { value: '12-24hours', label: '12-24 Hours' },
  { value: '24plushours', label: '24+ Hours' },
];

export const AccessTimeDropdownFilter: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useFilters();
  const handleChange = (event: React.SyntheticEvent, newValue: { value: string }[]) => {
    const values = newValue.map((option) => option.value);
    // @ts-expect-error TS2322: Type 'string[]' is not assignable to type 'string | undefined', works as expected
    setFilters('accessTime', values);
  };
  //const accessTime = filters.get('accessTime');

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={menuValues}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Access Time" multiline={false} />
      )}
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
//Could also use JSON.stringify on the values array before passing to setFilters. This would allow passing the whole array rather than a string.

//May want to limit or sanitize the joined string length to avoid overly long URLs.

//Can split the comma-separated string back into an array when reading the filter value
