import { AddCircleOutline } from '@mui/icons-material';
import { Box, FormControl, FormControlLabel, IconButton, TextField } from '@mui/material';
import React from 'react';

const addPayClass = () => {
  return (
    <FormControl>
      <FormControlLabel control={<TextField />} label="Pay Class" />
      <FormControlLabel control={<TextField />} label="Pay Class Percentage" />
      <TextField
        label="Expected Pay"
        InputProps={{ readOnly: true }}
        defaultValue="No Expectation"
      />
    </FormControl>
  );
};

export const WeightedPoolControl: React.FC = () => {
  const [payClasses, setPayClasses] = React.useState([]);

  const handleAddingClass = () => {
    setPayClasses((prevClasses) => {
      if (prevClasses.length >= 8) {
        alert('You cannot add more than 8 pay classes.');
        return prevClasses;
      }
      return [...prevClasses, addPayClass()];
    });
  };

  return (
    <Box>
      <FormControl>
        <FormControlLabel control={<TextField />} label="Pay Class" />
        <FormControlLabel control={<TextField />} label="Pay Class Amount" />
        <TextField
          label="Expected Pay"
          InputProps={{ readOnly: true }}
          defaultValue="No Expectation"
        />
      </FormControl>
      {payClasses.map((payClass) => payClass)}
      <IconButton onClick={handleAddingClass}>
        <AddCircleOutline color="secondary" />
      </IconButton>
    </Box>
  );
};
