import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from '@mui/material';
import React from 'react';

import { FlatRateControl } from './PayrollFormControls/FlatRateControl';
/*
import { ParticipationPoolControl } from './PayrollFormControls/ParticipationPoolControl';
import { PoolControl } from './PayrollFormControls/PoolControl';
import { SteppedFlatRateControl } from './PayrollFormControls/SteppedFlatRateControl';
import { TimedPayControl } from './PayrollFormControls/TimedPayControl';
import { WeightedPoolControl } from './PayrollFormControls/WeightedPoolControl';
import { WeightedTimedPayControl } from './PayrollFormControls/WeightedTimedPayControl';
*/

const formDetails = {
  FlatRate: <FlatRateControl />,
  TimedPay: null,
  Pool: null,
  ParticipationPool: null,
  SteppedFlatRate: null,
  WeightedPool: null,
  WeightedTimedPay: null,
};

type PayrollDetailsKey = keyof typeof formDetails;

interface CustomFormControlProps {
  value: PayrollDetailsKey;
  disabled?: boolean;
}

const RadioControl: React.FC<CustomFormControlProps> = ({ value, disabled = true }) => {
  return (
    <FormControlLabel
      control={<Radio size="small" color="secondary" />}
      label={value}
      value={value}
      disabled={disabled}
      componentsProps={{
        typography: {
          variant: 'body2',
          color: 'text.main',
        },
      }}
      sx={{ m: '0', p: '0' }}
    />
  );
};

export const PayrollForm: React.FC = () => {
  const [isComplex, setIsComplex] = React.useState(false);
  const [selectedPayType, setSelectedPayType] =
    React.useState<PayrollDetailsKey>('FlatRate');

  const handlePayrollChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayType(event.target.value as PayrollDetailsKey);
  };

  const handleStructureTypeSwitch = (event) => {
    setIsComplex(event.target.checked);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormLabel sx={{ fontWeight: 'bold' }}>Payroll Setup</FormLabel>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{}}>
          <FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">Simple</Typography>
              <Switch
                checked={isComplex}
                onChange={handleStructureTypeSwitch}
                color="secondary"
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography variant="body2">Complex</Typography>
            </Box>
            {!isComplex ? (
              <RadioGroup value={selectedPayType} onChange={handlePayrollChange}>
                <RadioControl value="FlatRate" disabled={false} />
                <RadioControl value="TimedPay" />
                <RadioControl value="Pool" />
              </RadioGroup>
            ) : (
              <RadioGroup value={selectedPayType} onChange={handlePayrollChange}>
                <RadioControl value="ParticipationPool" />
                <RadioControl value="SteppedFlatRate" />
                <RadioControl value="WeightedPool" />
                <RadioControl value="WeightedTimedPay" />
              </RadioGroup>
            )}
          </FormControl>
        </Box>
        <Box>
        <FormControl>
          <FormLabel>Payroll Details</FormLabel>
          {selectedPayType && formDetails[selectedPayType]}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
