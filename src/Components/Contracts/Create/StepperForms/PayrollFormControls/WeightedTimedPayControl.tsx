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
import { Form } from 'react-router-dom';

const addPayClass = () => {
  return (
    <FormControl>
      <FormControlLabel control={<TextField />} label="Class Name" />
      <FormControlLabel control={<TextField />} label="Class Pay" />
      <FormControlLabel control={<Select label="Pay Rate" />} label="Pay Rate" />
    </FormControl>
  );
};

export const WeightedTimedPayControl: React.FC = () => {
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
        <FormControlLabel control={<Switch />} label="Pay Rate Per Class" />
        <FormControlLabel control={<Select label="Pay Rate" />} label="Pay Rate" />
      </FormControl>
      <FormControl>
        <FormControlLabel control={<TextField />} label="Class Name" />
        <FormControlLabel control={<TextField />} label="Class Pay" />
        <FormControlLabel control={<Select label="Pay Rate" />} label="Pay Rate" />
      </FormControl>
      {payClasses.map((payClass) => payClass)}
      <IconButton onClick={handleAddingClass}>
        <AddCircleOutline color="secondary" />
      </IconButton>
    </Box>
  );
};
