import { useSoundEffect } from '@Audio/AudioManager';
import { PayField } from '@Common/Components/Functional/Applcation/Inputs/PayField';
import { Box, FormControlLabel, MenuItem, Select, Switch } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import type { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import type { ICreateContractBody } from 'vl-shared/src/schemas/contracts/ContractSchema';

export const FlatRatePayroll: React.FC<{
  formData: Partial<ICreateContractBody>;
  onChange: (value: string) => void;
}> = (props) => {
  const { formData, onChange } = props;
  const [counterAmount, setCounterAmount] = React.useState<number | null>(null);

  const sound = useSoundEffect();

  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const invalidCharacters = value.match(/[^\d.,]/g);
      if (invalidCharacters) {
        enqueueSnackbar('Please only use numbers', { variant: 'error' });
        sound.playSound('warning');
      }
      const inputValue = Number(value.replace(/[^\d.]/g, ''));
      setCounterAmount(inputValue);
      onChange(inputValue.toString());
    },
    [onChange, setCounterAmount, sound],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '.5em' }}>
      <PayField
        label="Default Pay"
        value={counterAmount?.toLocaleString() ?? null}
        onChange={handlePayChange}
        structure={formData.payStructure as ContractPayStructure}
      />
    </Box>
  );
};

export const PoolPayroll: React.FC<{
  formData: Partial<ICreateContractBody>;
  onChange: (value: string) => void;
  evenSplit: boolean;
  setEvenSplit: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}> = (props) => {
  const { onChange, evenSplit, setEvenSplit, formData } = props;

  const [counterAmount, setCounterAmount] = React.useState<number | null>(null);

  const sound = useSoundEffect();

  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const invalidCharacters = value.match(/[^\d.,]/g);
      if (invalidCharacters) {
        enqueueSnackbar('Please only use numbers', { variant: 'error' });
        sound.playSound('warning');
      }
      const inputValue = Number(value.replace(/[^\d.]/g, ''));
      setCounterAmount(inputValue);
      onChange(inputValue.toString());
    },
    [onChange, setCounterAmount, sound],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '.5em',
        justifyContent: 'center',
      }}
    >
      <PayField
        label="Default Pay"
        value={counterAmount?.toLocaleString() ?? null}
        onChange={handlePayChange}
        structure={formData.payStructure as ContractPayStructure}
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
}> = (props) => {
  const { onChange, formData } = props;
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

  const [counterAmount, setCounterAmount] = React.useState<number | null>(null);

  const sound = useSoundEffect();

  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const invalidCharacters = value.match(/[^\d.,]/g);
      if (invalidCharacters) {
        enqueueSnackbar('Please only use numbers', { variant: 'error' });
        sound.playSound('warning');
      }
      const inputValue = Number(value.replace(/[^\d.]/g, ''));
      setCounterAmount(inputValue);
      onChange(inputValue.toString());
    },
    [onChange, setCounterAmount, sound],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '.5em',
        justifyContent: 'center',
        gap: '.5em',
      }}
    >
      <PayField
        label="Default Pay"
        value={counterAmount?.toLocaleString() ?? null}
        onChange={handlePayChange}
        structure={formData.payStructure as ContractPayStructure}
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
