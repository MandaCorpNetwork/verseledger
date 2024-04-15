import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

import { useFilters } from '@/Utils/Hooks/useFilters';

const menuValues = [
  { value: 'all', label: 'All' },
  { value: 'individual', label: 'Individual' },
  { value: '1-5members', label: '1-5 Members' },
  { value: '5-50members', label: '5-50 Members' },
  { value: '50-200members', label: '50-200 Members' },
  { value: '200-500members', label: '200-500 Members' },
  { value: '500plusmembers', label: '500+ Members' },
];

export const ContractOwnerTypeDropdownFilter: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filters, setFilters] = useFilters();
  const handleChange = (_event: React.SyntheticEvent, newValue: { value: string }[]) => {
    const values = newValue.map((option) => option.value);
    // @ts-expect-error TS2322: Type 'string[]' is not assignable to type 'string | undefined', works as expected
    setFilters('contractOwnerType', values);
  };
  //const accessTime = filters.get('accessTime');
  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={menuValues}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Contract Owner" multiline={false} />
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
