import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { SelectTimeButton } from '@Common/Components/Buttons/SelectTimeButton';
import { Clear } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { QueryNames } from '../QueryNames';
import { TimePicker } from '@Common/Components/TextFields/TimePicker';

export const SchedulingDropdownFilter: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filters, setFilters] = useURLQuery();
  // const handleChange = (_event: React.SyntheticEvent, newValue: { value: string }[]) => {
  //   const values = newValue.map((option) => option.value);
  //   setFilters(QueryNames.TimeRemaining, values);
  // };

  return (
    <Box
      data-testid="SchedulingDropdownFilter__Form_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5em',
      }}
    >
      <DigiDisplay data-testid="SchedulingDropdownFilter__BidDate_Wrapper">
        <Typography>Bid Date</Typography>
        <Box data-testid="SchedulingDropdownFilter-BidDate__FieldWrapper">
          <TimePicker label="Bid Ends Before" />
          <TextField size="small" color="secondary" label="After" />
        </Box>
      </DigiDisplay>
      <DigiDisplay data-testid="SchedulingDropdownFilter__StartDate_Wrapper">
        <Typography>Start Date</Typography>
        <Box data-testid="SchedulingDropdownFilter-StartDate__FieldWrapper"></Box>
      </DigiDisplay>
      <DigiDisplay data-testid="SchedulingDropdownFilter__EndDate_Wrapper">
        <Typography>End Date</Typography>
        <Box data-testid="SchedulingDropdownFilter-EndDate__FieldWrapper"></Box>
      </DigiDisplay>
      <DigiDisplay>
        <Typography>Duration</Typography>
      </DigiDisplay>
      <Typography></Typography>
    </Box>
  );
};
