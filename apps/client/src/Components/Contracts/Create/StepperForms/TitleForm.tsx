import { Box, FormControl, FormControlLabel, TextField } from '@mui/material';
import React from 'react';

export const TitleForm: React.FC = () => {
  return (
    <Box>
      <FormControl>
        <FormControlLabel control={<TextField />} label="Title" />
      </FormControl>
    </Box>
  );
};
