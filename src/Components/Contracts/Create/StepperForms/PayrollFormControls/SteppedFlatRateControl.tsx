import { AddCircleOutline } from '@mui/icons-material';
import { Box, FormControl, FormControlLabel, IconButton, TextField } from '@mui/material';
import React from 'react';

interface PayClass {
  id: number;
}

export const SteppedFlatRateControl: React.FC = () => {
  const [payClasses, setPayClasses] = React.useState<PayClass[]>([]);

  const handleAddingClass = () => {
    setPayClasses((prevClasses) => {
      if (prevClasses.length >= 8) {
        alert('You cannot add more than 8 pay classes.');
        return prevClasses;
      }
      const newClass = { id: prevClasses.length + 1 };
      return [...prevClasses, newClass];
    });
  };

  return (
    <Box>
      <FormControl>
        <FormControlLabel control={<TextField />} label="Pay Class" />
        <FormControlLabel control={<TextField />} label="Pay Class Amount" />
      </FormControl>
      {payClasses.map((payClass) => (
        <FormControl key={payClass.id}>
          <FormControlLabel control={<TextField />} label="Pay Class" />
          <FormControlLabel control={<TextField />} label="Pay Class Amount" />
        </FormControl>
      ))}
      <IconButton onClick={handleAddingClass}>
        <AddCircleOutline color="secondary" />
      </IconButton>
    </Box>
  );
};
