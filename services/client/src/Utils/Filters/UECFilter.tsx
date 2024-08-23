import { PayField } from '@Common/Components/TextFields/PayField';
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { QueryNames } from '@Utils/QueryNames';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type UECFilterProps = {
  size?: 'small' | 'medium';
  innerSpace?: 'dense' | 'normal';
};

const structureOptions = [
  { label: 'Flatrate', value: 'FLATRATE' },
  { label: 'Hourly', value: 'HOURLY' },
  { label: 'Pool', value: 'POOL' },
];

export const UECFilter: React.FC<UECFilterProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useURLQuery();

  const handlePayStructure = React.useCallback(
    (event: SelectChangeEvent<string>) => {
      const selectedValue = event.target.value;
      setFilter(QueryNames.PayStructure, selectedValue);
    },
    [setFilter],
  );

  const filterNumericInput = (input: string) => {
    const invalidCharacters = input.match(/\D+/g);

    if (invalidCharacters) {
      enqueueSnackbar('Please only use numbers', { variant: 'error' });
    }

    return input.replace(/\D+/g, '');
  };

  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, field: QueryNames) => {
      const numericValue = filterNumericInput(event.target.value);
      setFilter(field, numericValue);
    },
    [setFilter, filter],
  );

  const handleClearPay = React.useCallback(
    (field: QueryNames) => {
      setFilter(field, []);
    },
    [setFilter],
  );

  const formatPayString = React.useCallback(
    (pay: number) => {
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

  return (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Box>
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel color="secondary">Pay Structure</InputLabel>
          <Select
            size="small"
            value={filter.get(QueryNames.PayStructure) ?? ''}
            label={<InputLabel>Pay Structure</InputLabel>}
            color="secondary"
            onChange={handlePayStructure}
            autoWidth
          >
            {structureOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <PayField
          label="Minimum Pay"
          onChange={(event) => handlePayChange(event, QueryNames.UECRangeMin)}
          onClear={() => handleClearPay(QueryNames.UECRangeMin)}
          value={formatPayString(Number(filter.get(QueryNames.UECRangeMin)))}
          structure={
            (filter.get(QueryNames.PayStructure) as ContractPayStructure) ?? 'FLATRATE'
          }
        />
        <PayField
          label="Maximum Pay"
          onChange={(event) => handlePayChange(event, QueryNames.UECRangeMax)}
          onClear={() => handleClearPay(QueryNames.UECRangeMax)}
          value={formatPayString(Number(filter.get(QueryNames.UECRangeMax)))}
          structure={
            (filter.get(QueryNames.PayStructure) as ContractPayStructure) ?? 'FLATRATE'
          }
        />
      </Box>
    </Box>
  );
};
