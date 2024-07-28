import { Tooltip, Typography } from '@mui/material';
import React from 'react';

import { DigiField } from './DigiField';

type DefaultPayLabelProps = {
  pay: number;
  maxWidth?: string;
  width?: string;
  testid?: string;
};

const DefaultPayLabel: React.FC<DefaultPayLabelProps> = ({
  pay,
  maxWidth,
  width,
  testid,
}) => {
  const formattedPay = pay.toLocaleString();
  return (
    <Tooltip title={formattedPay} arrow>
      <DigiField
        data-testid={testid}
        label="Default Pay"
        startAdornment={
          <Typography color="secondary" sx={{ fontSize: '1em' }}>
            ¤
          </Typography>
        }
        sx={{
          maxWidth: maxWidth,
          width: width,
        }}
      >
        {formattedPay}
      </DigiField>
    </Tooltip>
  );
};

export const DefaultPay = React.memo(DefaultPayLabel);
