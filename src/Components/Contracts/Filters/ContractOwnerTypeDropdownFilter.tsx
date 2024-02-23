import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

type ContractOwnerFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const ContractOwnerTypeDropdownFilter: React.FC<ContractOwnerFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const menuValues = [
    { value: 'all', label: 'All' },
    { value: 'individual', label: 'Individual' },
    { value: '1-5members', label: '1-5 Members' },
    { value: '5-50members', label: '5-50 Members' },
    { value: '50-200members', label: '50-200 Members' },
    { value: '200-500members', label: '200-500 Members' },
    { value: '500plusmembers', label: '500+ Members' },
  ];

  const handleChange = (event, newValue: string[]) => {
    const values = newValue.map((option) => option.value);
    const newParams = new URLSearchParams();
    newParams.set('contractOwner', values.join(','));
    setSearchParams(newParams);
  };

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
