import { Tooltip, Typography } from '@mui/material';
import React from 'react';

import { DigiField } from './DigiField';

type PayLabelProps = {
  label: string;
  pay: number;
  sx?: object;
  maxWidth?: string;
  width?: string;
  testid?: string;
  slots?: object;
};

const PayDigiField: React.FC<PayLabelProps> = ({
  label,
  pay,
  maxWidth,
  width,
  testid,
  sx,
  slots,
}) => {
  const formattedPay = pay.toLocaleString();
  return (
    <Tooltip title={formattedPay} arrow>
      <DigiField
        data-testid={testid}
        label={label}
        slots={slots}
        startAdornment={
          <Typography color="secondary" sx={{ fontSize: '1em' }}>
            ¤
          </Typography>
        }
        sx={{
          maxWidth: maxWidth,
          width: width,
          ...sx,
        }}
      >
        {formattedPay}
      </DigiField>
    </Tooltip>
  );
};

export const PayDisplay = React.memo(PayDigiField);
