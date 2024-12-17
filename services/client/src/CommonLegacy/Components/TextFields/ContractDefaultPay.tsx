import { InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import type React from 'react';

type ContractDefaultPayLabelProps = {
  pay: number;
  maxWidth?: string;
};

export const ContractDefaultPayLabel: React.FC<ContractDefaultPayLabelProps> = ({
  pay,
  maxWidth,
}) => {
  const formattedPay = pay.toLocaleString();
  return (
    <Tooltip title={formattedPay} arrow>
      <TextField
        data-testid="ContractDefaultPayLabel"
        size="small"
        label="Default Pay"
        value={formattedPay}
        color="secondary"
        margin="dense"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography color="secondary">¤</Typography>
            </InputAdornment>
          ),
          style: {
            cursor: 'default',
          },
        }}
        inputProps={{
          readOnly: true,
          style: {
            cursor: 'default',
          },
        }}
        sx={{
          maxWidth: maxWidth,
        }}
      />
    </Tooltip>
  );
};
