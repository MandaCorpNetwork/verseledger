import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const NumberTextField = (props) => {
  return (
    <TextField
      {...props}
      sx={{ width: '30%', display: 'flex' }}
      variant="outlined"
      label="Amount"
    />
  );
};

export const UECRangeDropdownFilter: React.FC<unknown> = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5%' }}>
      <NumericFormat
        prefix="¤"
        customInput={NumberTextField}
        thousandSeparator=","
        allowNegative={false}
        decimalScale={0}
      />
      <Typography variant="button" sx={{ margin: '1em' }}>To</Typography>
      <NumericFormat
        prefix="¤"
        customInput={NumberTextField}
        thousandSeparator=","
        allowNegative={false}
        decimalScale={0}
      />
    </Box>
  );
};
