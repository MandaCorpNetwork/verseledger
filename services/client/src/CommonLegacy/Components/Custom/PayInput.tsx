import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';

type PayInputProps = {
  label: string;
  value: number;
  color?: 'primary' | 'secondary' | 'info' | 'error' | 'warning' | 'success';
  testid?: string;
  margin?: 'dense' | 'none';
  structure?: ContractPayStructure;
  size?: 'small' | 'medium';
  sx?: object;
};

export const PayInput: React.FC<PayInputProps> = ({
  label,
  value,
  color = 'secondary',
  margin,
  testid,
  structure,
  size,
  sx,
}) => {
  const payString = React.useCallback(() => {
    if (!structure) return value.toLocaleString();
    const poolPay = structure === 'POOL' && value > 100 ? 'Over Limit' : value;
    switch (structure) {
      case 'FLATRATE':
      case 'HOURLY':
        return value.toLocaleString();
      case 'POOL':
        return poolPay;
    }
  }, [value, structure]);
  const formattedPay = payString();

  const getPaySuffix = React.useCallback(() => {
    if (structure === 'POOL') {
      return (
        <Typography variant="body2" color="secondary">
          %
        </Typography>
      );
    }
    if (structure === 'HOURLY') {
      return (
        <Typography variant="body2" color="secondary">
          /HR
        </Typography>
      );
    }
  }, [structure]);
  const paySuffix = getPaySuffix();
  return (
    <FormControl size={size}>
      <InputLabel color={color}>{label}</InputLabel>
      <Tooltip title={`${formattedPay} ${paySuffix}`} arrow>
        <OutlinedInput
          data-testid={`PayDisplayOutlined__${testid}_root`}
          notched={true}
          label={`${label}.....`}
          margin={margin}
          value={formattedPay}
          readOnly
          color={color}
          inputProps={{
            style: {
              cursor: 'default',
            },
          }}
          startAdornment={
            structure !== 'POOL' && (
              <Typography color="secondary" sx={{ mr: '.2em' }}>
                ¤
              </Typography>
            )
          }
          endAdornment={structure !== 'FLATRATE' && paySuffix}
          sx={{
            cursor: 'default',
            textAlign: 'center',
            fontSize: '.9em',
            ...sx,
          }}
        />
      </Tooltip>
    </FormControl>
  );
};
