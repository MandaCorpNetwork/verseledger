import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

import { useFilters } from '@/Utils/Hooks/useFilters';

interface NumberInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  id: string;
  label: string;
  helperText: string;
  error: boolean;
}

export const UECRangeInputFilter: React.FC<NumberInputProps> = () => {
  const [lowerValue, setLowerValue] = useState<number | null>(0);
  const [higherValue, setHigherValue] = useState<number | null>(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [filters, setFilters] = useFilters();

  const rangeValidation = (lowerValue: number | null, higherValue: number | null) => {
    setIsInvalid(lowerValue! > higherValue!);
  };

  const handleLowerValueChange = (value: number | null) => {
    setLowerValue(value);
    rangeValidation(value, higherValue);
    // @ts-expect-error TS2322: Type 'number | null' is not assignable to type 'string | undefined
    setFilters('ueclow', value);
  };

  const handleHigherValueChange = (value: number | null) => {
    setHigherValue(value);
    rangeValidation(lowerValue, value);
    // @ts-expect-error TS2322: Type 'number | null' is not assignable to type 'string | undefined
    setFilters('uechigh', value);
  };

  const LowerNumberTextField = (props) => {
    return (
      <TextField
        {...props}
        sx={{ width: '30%', display: 'flex' }}
        variant="outlined"
        label="Least Amount"
        error={isInvalid}
        helperText={isInvalid ? 'Invalid Range' : ''}
      />
    );
  };

  const HigherNumberTextField = (props) => {
    return (
      <TextField
        {...props}
        sx={{ width: '30%', display: 'flex' }}
        variant="outlined"
        label="Highest Amount"
        error={isInvalid}
        helperText={isInvalid ? 'Invalid Range' : ''}
      />
    );
  };

  return (
    <Box
      id="UEC-Range-Filter-Box"
      sx={{ display: 'flex', flexDirection: 'column', marginLeft: '5%' }}
    >
      <Typography sx={{ fontWeight: 'bold', padding: '.2em' }}>Price Range</Typography>
      <Box
        id="UEC-Range-Selection"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <NumericFormat
          prefix="¤"
          customInput={LowerNumberTextField}
          thousandSeparator=","
          allowNegative={false}
          decimalScale={0}
          defaultValue={null}
          onValueChange={(values) => handleLowerValueChange(values.floatValue)}
        />
        <Typography variant="button" sx={{ margin: '1em', fontWeight: 'bold' }}>
          To
        </Typography>
        <NumericFormat
          prefix="¤"
          customInput={HigherNumberTextField}
          thousandSeparator=","
          allowNegative={false}
          decimalScale={0}
          defaultValue={null}
          onValueChange={(values) => handleHigherValueChange(values.floatValue)}
        />
      </Box>
    </Box>
  );
};
