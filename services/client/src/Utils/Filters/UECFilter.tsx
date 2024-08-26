import { PayField } from '@Common/Components/TextFields/PayField';
import { Clear } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  TextField,
} from '@mui/material';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type UECFilterProps = {
  onClearAll?: () => void;
};

const structureOptions = [
  { label: 'Flatrate', value: 'FLATRATE' },
  { label: 'Hourly', value: 'HOURLY' },
  { label: 'Pool', value: 'POOL' },
];

export const UECFilter: React.FC<UECFilterProps> = ({ onClearAll }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useURLQuery();
  const [localMin, setLocalMin] = React.useState<string>('');
  const [localMax, setLocalMax] = React.useState<string>('');

  const handlePayStructure = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedValue = event.target.value;
      setFilter(QueryNames.PayStructure, selectedValue);
    },
    [setFilter],
  );

  const handleClearPay = React.useCallback(
    (field: QueryNames) => {
      if (field === QueryNames.UECRangeMin) {
        setLocalMin('');
      } else if (field === QueryNames.UECRangeMax) {
        setLocalMax('');
      }
      setFilter(field, []);
    },
    [setLocalMax, setLocalMin, setFilter],
  );

  const filterNumericInput = (input: string) => {
    return input.replace(/\D+/g, '');
  };

  const formatPayString = React.useCallback(
    (pay: number) => {
      if (pay === 0) {
        return '';
      }
      const payStructure = filter.get(QueryNames.PayStructure);
      switch (payStructure) {
        case 'FLATRATE':
          return pay.toLocaleString();
        case 'HOURLY':
          return pay.toLocaleString();
        case 'POOL':
          return pay > 100 ? 'Over Limit' : pay.toString();
        default:
          return pay.toLocaleString();
      }
    },
    [filter],
  );

  React.useEffect(() => {
    if (localMin === '' && localMax === '') {
      setFilter(QueryNames.UECRangeMin, []);
      setFilter(QueryNames.UECRangeMax, []);
      return;
    }
    if (localMin !== '' && localMax !== '' && Number(localMin) > Number(localMax)) {
      return;
    }
    if (localMin !== '') {
      setFilter(QueryNames.UECRangeMin, localMin);
    } else {
      setFilter(QueryNames.UECRangeMin, []);
    }
    if (localMax !== '') {
      setFilter(QueryNames.UECRangeMax, localMax);
    } else {
      setFilter(QueryNames.UECRangeMax, []);
    }
  }, [localMin, localMax]);

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
          value={filter.get(QueryNames.PayStructure) ?? ''}
          label="Pay Structure"
          color="secondary"
          onChange={handlePayStructure}
          InputProps={{
            endAdornment: filter.get(QueryNames.PayStructure) ? (
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
            (filter.get(QueryNames.PayStructure) as ContractPayStructure) ?? 'FLATRATE'
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
            (filter.get(QueryNames.PayStructure) as ContractPayStructure) ?? 'FLATRATE'
          }
          sx={{ maxWidth: '150px' }}
        />
      </Box>
    </Box>
  );
};
