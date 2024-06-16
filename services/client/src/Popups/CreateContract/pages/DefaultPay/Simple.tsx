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
  formData: ICreateContractBody;
  onChange: (value: number) => void;
}> = (props) => {
  const { formData, onChange } = props;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '.5em' }}>
      <TextField
        size="small"
        label="Pay"
        type="number"
        color="secondary"
        value={formData.defaultPay || ''}
        onChange={(e) => onChange(+e.target.value)}
        InputProps={{ startAdornment: '¤' }}
        sx={{
          width: '150px',
        }}
      />
    </Box>
  );
};

export const PoolPayroll: React.FC<{
  formData: ICreateContractBody;
  onChange: (value: number) => void;
  evenSplit: boolean;
  setEvenSplit: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}> = (props) => {
  const { formData, onChange, evenSplit, setEvenSplit } = props;

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
        label="Pay Percentage"
        type="number"
        color="secondary"
        value={formData.defaultPay || ''}
        onChange={(e) => onChange(Number(e.target.value))}
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
  formData: ICreateContractBody;
  onChange: (value: number) => void;
}> = (props) => {
  const { formData, onChange } = props;
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
        type="number"
        color="secondary"
        value={formData.defaultPay || ''}
        onChange={(e) => onChange(Number(e.target.value))}
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
