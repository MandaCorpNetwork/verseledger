import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

type AccessTimeFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

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

export const AccessTimeDropdownFilter: React.FC<AccessTimeFilterProps> = ({
  searchParams, //eslint-disable-line
  setSearchParams,
}) => {
  const handleChange = (event, newValue: string[]) => {
    const values = newValue.map((option) => option.value)
    const newParams = new URLSearchParams();
    newParams.set('accessTime', values.join(','));
    setSearchParams(newParams);
  };

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
