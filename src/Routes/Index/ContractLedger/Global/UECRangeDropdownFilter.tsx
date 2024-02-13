import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';

export const UECRangeDropdownFilter: React.FC<unknown> = () => {
  return (
    <Box>
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">¤</InputAdornment>,
        }}
      />
      <Typography>To</Typography>
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">¤</InputAdornment>,
        }}
      />
    </Box>
  );
};
