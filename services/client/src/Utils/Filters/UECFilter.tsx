import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { PayField } from '@CommonLegacy/Components/TextFields/PayField';
import { Clear } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  TextField,
} from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import React from 'react';
import type { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';

const structureOptions = [
  { label: 'Flatrate', value: 'FLATRATE' },
  { label: 'Hourly', value: 'HOURLY' },
  { label: 'Pool', value: 'POOL' },
];

export const UECFilter: React.FC<unknown> = () => {
  const { searchParams, setFilters } = useURLQuery();
  const [localMin, setLocalMin] = React.useState<string>('');
  const [localMax, setLocalMax] = React.useState<string>('');

  const handlePayStructure = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedValue = event.target.value;
      setFilters(QueryNames.PayStructure, selectedValue);
    },
    [setFilters],
  );

  const handleClearPay = React.useCallback(
    (field: QueryNames) => {
      if (field === QueryNames.UECRangeMin) {
        setLocalMin('');
      } else if (field === QueryNames.UECRangeMax) {
        setLocalMax('');
      }
      setFilters(field, []);
    },
    [setLocalMax, setLocalMin, setFilters],
  );

  const filterNumericInput = (input: string) => {
    return input.replace(/\D+/g, '');
  };

  const formatPayString = React.useCallback(
    (pay: number) => {
      if (pay === 0) {
        return '';
      }
      const payStructure = searchParams.get(QueryNames.PayStructure);
      switch (payStructure) {
        case 'POOL':
          return pay > 100 ? 'Over Limit' : pay.toString();
        case 'FLATRATE':
        case 'HOURLY':
        default:
          return pay.toLocaleString();
      }
    },
    [searchParams],
  );

  React.useEffect(() => {
    if (localMin === '' && localMax === '') {
      setFilters(QueryNames.UECRangeMin, []);
      setFilters(QueryNames.UECRangeMax, []);
      return;
    }
    if (localMin !== '' && localMax !== '' && Number(localMin) > Number(localMax)) {
      return;
    }
    if (localMin !== '') {
      setFilters(QueryNames.UECRangeMin, localMin);
    } else {
      setFilters(QueryNames.UECRangeMin, []);
    }
    if (localMax !== '') {
      setFilters(QueryNames.UECRangeMax, localMax);
    } else {
      setFilters(QueryNames.UECRangeMax, []);
    }
  }, [localMin, localMax, setFilters]);

  const handlePayError = React.useCallback(() => {
    if (localMin !== '' && localMax !== '' && Number(localMin) > Number(localMax)) {
      return true;
    }
    return false;
  }, [localMax, localMin]);

  const isError = handlePayError();

  return (
    <Box
      sx={{ display: 'flex', gap: '1em', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box>
        <TextField
          select
          size="small"
          value={searchParams.get(QueryNames.PayStructure) ?? ''}
          label="Pay Structure"
          color="secondary"
          onChange={handlePayStructure}
          InputProps={{
            endAdornment: searchParams.get(QueryNames.PayStructure) ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => handleClearPay(QueryNames.PayStructure)}
                  sx={{
                    mx: '.5em',
                  }}
                >
                  <Clear fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
          sx={{ minWidth: '150px' }}
        >
          {structureOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ gap: '1em', display: 'flex' }}>
        <PayField
          label="Minimum Pay"
          errorColor={isError}
          onChange={(event) => setLocalMin(filterNumericInput(event.target.value))}
          onClear={() => handleClearPay(QueryNames.UECRangeMin)}
          value={formatPayString(Number(localMin))}
          structure={
            (searchParams.get(QueryNames.PayStructure) as ContractPayStructure) ??
            'FLATRATE'
          }
          sx={{ maxWidth: '150px' }}
        />
        <PayField
          label="Maximum Pay"
          errorColor={isError}
          onChange={(event) => setLocalMax(filterNumericInput(event.target.value))}
          onClear={() => handleClearPay(QueryNames.UECRangeMax)}
          value={formatPayString(Number(localMax))}
          structure={
            (searchParams.get(QueryNames.PayStructure) as ContractPayStructure) ??
            'FLATRATE'
          }
          sx={{ maxWidth: '150px' }}
        />
      </Box>
    </Box>
  );
};
