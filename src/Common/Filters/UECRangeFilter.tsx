import { Box, InputAdornment, TextField } from '@mui/material';
import React from 'react';

import { QueryNames } from '@/Common/definitions/QueryNames';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type UECRangeFilterProps = {
  size: 'small' | 'medium';
  innerSpace: 'dense' | 'normal';
};

export const UECRangeFilter: React.FC<UECRangeFilterProps> = ({ size, innerSpace }) => {
  const [filters, setFilters] = useURLQuery();

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(QueryNames.UECRangeMin, String(event.target.value));
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(QueryNames.UECRangeMax, String(event.target.value));
  };

  const currentMinValue = filters.get(QueryNames.UECRangeMin);

  const currentMaxValue = filters.get(QueryNames.UECRangeMax);

  const minError =
    currentMaxValue !== null &&
    currentMinValue !== null &&
    Number(currentMinValue) > Number(currentMaxValue);

  const maxError =
    currentMinValue !== null &&
    currentMaxValue !== null &&
    Number(currentMaxValue) < Number(currentMinValue);

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        type="number"
        onChange={handleMinChange}
        value={currentMinValue}
        size={size}
        label="Minimum UEC"
        color="secondary"
        margin={innerSpace}
        error={minError}
        helperText={minError ? 'Make Min less than Max' : null}
        sx={{
          width: size === 'small' ? '135px' : 'auto',
        }}
        InputProps={{
          startAdornment:
            currentMinValue === null ? null : (
              <InputAdornment position="start">¤</InputAdornment>
            ),
        }}
      />
      <TextField
        type="number"
        onChange={handleMaxChange}
        value={currentMaxValue}
        size={size}
        label="Maximum UEC"
        color="secondary"
        margin={innerSpace}
        error={maxError}
        helperText={maxError ? 'Make Max more than Min' : null}
        sx={{
          width: size === 'small' ? '135px' : 'auto',
        }}
        InputProps={{
          startAdornment:
            currentMaxValue === null ? null : (
              <InputAdornment position="start">¤</InputAdornment>
            ),
        }}
      />
    </Box>
  );
};
