import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export const ContractOwnerTypeFilterMenuDropdown: React.FC<unknown> = () => {
  const menuValues = [
    'all',
    'individual',
    '1-5members',
    '5-50members',
    '50-200members',
    '200-500members',
    '500plusmembers',
  ];
  return (
    <Autocomplete 
      multiple
      options={menuValues}
      renderInput={(params) =>
        <TextField {...params} label="Contract Owner Type" placeholder="Contract Owner Type" />
      }
      getOptionLabel={(option) => option}
    />
  );
};
