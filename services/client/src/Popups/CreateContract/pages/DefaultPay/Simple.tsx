import {
  Box,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

export const FlatRatePayroll: React.FC<{
  formData: Partial<ICreateContractBody>;
  onChange: (value: string) => void;
  getValue: () => string;
}> = (props) => {
  const { formData, onChange, getValue } = props;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '.5em' }}>
      <TextField
        size="small"
        label="Pay"
        type="string"
        color="secondary"
        value={getValue()}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{ startAdornment: '¤' }}
        sx={{
          width: '150px',
        }}
        inputProps={{
          min: formData.isEmergency ? 15000 : undefined,
        }}
      />
    </Box>
  );
};

export const PoolPayroll: React.FC<{
  formData: Partial<ICreateContractBody>;
  onChange: (value: string) => void;
  evenSplit: boolean;
  setEvenSplit: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  getValue: () => string;
}> = (props) => {
  const { onChange, evenSplit, setEvenSplit, getValue } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '.5em',
        justifyContent: 'center',
      }}
    >
      <TextField
        size="small"
        label="% of Pool"
        type="number"
        color="secondary"
        value={getValue()}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{ endAdornment: '%' }}
        sx={{
          width: '150px',
          mb: '.5em',
        }}
      />
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            size="small"
            checked={evenSplit}
            onChange={setEvenSplit}
          />
        }
        label="Even Split"
      />
    </Box>
  );
};

export const TimedPayroll: React.FC<{
  formData: Partial<ICreateContractBody>;
  onChange: (value: string) => void;
  getValue: () => string;
}> = (props) => {
  const { onChange, getValue } = props;
  const rates = [
    {
      value: 'Hourly',
      label: 'hr',
    },
    {
      value: 'Daily',
      lable: 'day',
    },
    {
      value: 'Weekly',
      label: 'wk',
    },
    {
      value: 'Monthly',
      label: 'mth',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '.5em',
        justifyContent: 'center',
      }}
    >
      <TextField
        size="small"
        label="Hourly Pay"
        type="string"
        color="secondary"
        value={getValue()}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{ endAdornment: '/HR', startAdornment: '¤' }}
        sx={{
          width: '150px',
          mb: '.5em',
        }}
      />
      <Select size="small" color="secondary" defaultValue="Hourly" disabled>
        {rates.map((rate) => (
          <MenuItem key={rate.value} value={rate.value}>
            {rate.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
