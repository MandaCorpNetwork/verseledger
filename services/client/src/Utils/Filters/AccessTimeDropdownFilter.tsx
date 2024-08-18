import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, Box, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { QueryNames } from '../QueryNames';

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
  const [_filters, setFilters] = useURLQuery();
  const handleChange = (_event: React.SyntheticEvent, newValue: { value: string }[]) => {
    const values = newValue.map((option) => option.value);
    setFilters(QueryNames.TimeRemaining, values);
  };
  //const accessTime = filters.get('accessTime');

  return (
    <Box>
      <DigiDisplay>
        <Typography>Bid Date</Typography>
      </DigiDisplay>
      <DigiDisplay>
        <Typography>Start Date</Typography>
      </DigiDisplay>
      <DigiDisplay>
        <Typography>End Date</Typography>
      </DigiDisplay>
      <DigiDisplay>
        <Typography>Duration</Typography>
      </DigiDisplay>
      <Typography></Typography>
    </Box>
  );
};
//Could also use JSON.stringify on the values array before passing to setFilters. This would allow passing the whole array rather than a string.

//May want to limit or sanitize the joined string length to avoid overly long URLs.

//Can split the comma-separated string back into an array when reading the filter value
