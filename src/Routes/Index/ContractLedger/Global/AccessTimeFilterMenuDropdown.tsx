import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export const AccessTimeFilterMenuDropdown: React.FC<unknown> = () => {
  const menuValues = [
    'all',
    '10minutes',
    '10-30minutes',
    '30-60minutes',
    '1-5hours',
    '5-12hours',
    '12-24hours',
    '24plushours',
  ];

  return (
    <Autocomplete 
      multiple
      options={menuValues}
      renderInput={(params) =>
        <TextField {...params} label="Access Time" placeholder="Access Time" />
      }
      getOptionLabel={(option) => option}
    />
  );
};
