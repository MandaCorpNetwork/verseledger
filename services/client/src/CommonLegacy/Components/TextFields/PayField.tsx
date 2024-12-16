import { Clear } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import type { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';

type ContractDefaultPayLabelProps = {
  label: string;
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  sx?: object;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  structure: ContractPayStructure;
  activeCount?: number;
  error?: boolean;
  errorColor?: boolean;
  defaultValue?: string;
};

/** Input for UEC Amount */
export const PayField: React.FC<ContractDefaultPayLabelProps> = ({
  label,
  value,
  onChange,
  onClear,
  sx,
  structure,
  activeCount,
  onBlur,
  error,
  errorColor,
  defaultValue,
}) => {
  const maxLimit = activeCount ? 100 - activeCount : 100;

  const getColor = React.useCallback(() => {
    if (structure === 'POOL') {
      if (
        Number(value) >= 100 ||
        value === '0' ||
        Number(value) >= maxLimit ||
        errorColor
      )
        return 'error';
      else return 'secondary';
    } else {
      if (value === '0' || errorColor) return 'error';
      return 'secondary';
    }
  }, [errorColor, maxLimit, structure, value]);

  const color = getColor();

  const getPaySuffix = React.useCallback(() => {
    if (structure === 'POOL') {
      return (
        <Typography color={color} variant="body2" sx={{ my: 'auto' }}>
          %
        </Typography>
      );
    }
    if (structure === 'HOURLY') {
      return (
        <Typography color={color} variant="body2" sx={{ my: 'auto' }}>
          /HR
        </Typography>
      );
    }
  }, [color, structure]);
  const paySuffix = getPaySuffix();
  return (
    <Tooltip title={value} arrow>
      <TextField
        size="small"
        label={label}
        color={color}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        defaultValue={defaultValue}
        sx={{
          '.MuiInputBase-root': {
            paddingRight: '0px', // Adjust the right padding of the root
          },
          ...sx,
        }}
        InputProps={{
          startAdornment: structure !== 'POOL' && (
            <InputAdornment position="start">
              <Typography color={color} sx={{ fontSize: '1em' }}>
                ¤
              </Typography>
            </InputAdornment>
          ),
          endAdornment: onClear && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0px',
                fontSize: '.5em',
              }}
            >
              {structure !== 'FLATRATE' && paySuffix}
              <IconButton onClick={onClear} size="small" sx={{ ml: '0', pl: '0' }}>
                <Clear color="secondary" fontSize="small" />
              </IconButton>
            </Box>
          ),
        }}
      />
    </Tooltip>
  );
};
