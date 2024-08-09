import { Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';

import { DigiField } from './DigiField';

type PayLabelProps = {
  label: string;
  pay: number;
  sx?: object;
  maxWidth?: string;
  width?: string;
  testid?: string;
  slots?: object;
  structure?: ContractPayStructure;
};

const PayDigiField: React.FC<PayLabelProps> = ({
  label,
  pay,
  maxWidth,
  width,
  testid,
  sx,
  slots,
  structure,
}) => {
  const payString = React.useCallback(() => {
    if (!structure) return 'Invalid Structure';
    const poolPay = structure === 'POOL' && pay > 100 ? 'Over Limit' : pay;
    switch (structure) {
      case 'FLATRATE':
        return pay.toLocaleString();
      case 'POOL':
        return poolPay;
      case 'HOURLY':
        return pay.toLocaleString();
    }
  }, [structure, pay]);
  const formattedPay = payString();

  const getPaySuffix = React.useCallback(() => {
    if (structure === 'POOL') {
      return <Typography>%</Typography>;
    }
    if (structure === 'HOURLY') {
      return <Typography>/HR</Typography>;
    }
  }, [structure]);
  const paySuffix = getPaySuffix();

  return (
    <Tooltip title={formattedPay} arrow>
      <DigiField
        data-testid={testid}
        label={label}
        slots={slots}
        startAdornment={
          structure !== 'POOL' && (
            <Typography color="secondary" sx={{ fontSize: '1em' }}>
              ¤
            </Typography>
          )
        }
        endAdornment={structure !== 'FLATRATE' && paySuffix}
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
