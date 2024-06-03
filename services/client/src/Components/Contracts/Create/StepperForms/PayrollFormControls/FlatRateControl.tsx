import { Box, TextField } from '@mui/material';
import React from 'react';

interface FlatRateControlProps {
  formData: {
    payAmount: number;
  };
  onFormChange: (field: string, value: number) => void;
}

export const FlatRateControl: React.FC<FlatRateControlProps> = ({
  formData,
  onFormChange,
}) => {
  const handlePayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('payAmount', Number(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 'auto',
      }}
    >
      <TextField
        size="small"
        color="secondary"
        label="Pay Amount"
        value={formData.payAmount}
        onChange={handlePayAmountChange}
        sx={{ width: '150px' }}
      />
    </Box>
  );
};
