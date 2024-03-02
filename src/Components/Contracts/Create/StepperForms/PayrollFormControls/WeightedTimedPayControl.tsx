import { AddCircleOutline } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
interface PayClass {
  id: number;
}

export const WeightedTimedPayControl: React.FC = () => {
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
        <FormControlLabel control={<Switch />} label="Pay Rate Per Class" />
        <FormControlLabel control={<Select label="Pay Rate" />} label="Pay Rate" />
      </FormControl>
      <FormControl>
        <FormControlLabel control={<TextField />} label="Class Name" />
        <FormControlLabel control={<TextField />} label="Class Pay" />
        <FormControlLabel control={<Select label="Pay Rate" />} label="Pay Rate" />
      </FormControl>
      {payClasses.map((payClass) => (
        <FormControl key={payClass.id}>
          <FormControlLabel control={<TextField />} label="Class Name" />
          <FormControlLabel control={<TextField />} label="Class Pay" />
          <FormControlLabel control={<Select label="Pay Rate" />} label="Pay Rate" />
        </FormControl>
      ))}
      <IconButton onClick={handleAddingClass}>
        <AddCircleOutline color="secondary" />
      </IconButton>
    </Box>
  );
};
