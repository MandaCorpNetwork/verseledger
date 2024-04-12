import {
  Box,
  Checkbox,
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

interface CustomFormControlProps {
  value: string;
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

type PayrollFormProps = {
  formData: {
    payrollStructure: string;
    payAmount: number;
    bonusPay: boolean;
    allowBargaining: boolean;
  };
  onFormChange: (field: string, value: string | number | null | boolean) => void;
};

export const PayrollForm: React.FC<PayrollFormProps> = ({ formData, onFormChange }) => {
  const [isComplex, setIsComplex] = React.useState(false);
  const [selectedPayType, setSelectedPayType] = React.useState('FlatRate');

  const handleStructureTypeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplex(event.target.checked);
  };

  const handlePayStructureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPayType = event.target.value;
    setSelectedPayType(newPayType);
    onFormChange('payrollStructure', newPayType);
  };

  const handleBonusPayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('bonusPay', event.target.checked);
  };

  const handleAllowBargainingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('allowBargaining', event.target.checked);
  };
  const renderPayrollSetupComponent = () => {
    switch (selectedPayType) {
      case 'FlatRate':
        return <FlatRateControl formData={formData} onFormChange={onFormChange} />;
      case 'TimedPay':
        return null;
      case 'Pool':
        return null;
      case 'ParticipationPool':
        return null;
      case 'SteppedFlatRate':
        return null;
      case 'WeightedPool':
        return null;
      case 'WeightedTimePay':
        return null;
      default:
        return null;
    }
  };

  return (
    <Box
      data-testid="PayrollSetup__Container"
      sx={{ display: 'flex', flexDirection: 'column', width: '600px' }}
    >
      <FormLabel sx={{ fontWeight: 'bold' }}>Payroll Setup</FormLabel>
      <Box
        data-id="PayrollSetup-Form_Wrapper"
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <FormControl
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Box
            data-testid="PayrollStructure__Switch-Wrapper"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isComplex ? 'text.disabled' : 'secondary.main',
                fontWeight: 'bold',
              }}
            >
              Simple
            </Typography>
            <Switch
              checked={isComplex}
              onChange={handleStructureTypeSwitch}
              color="secondary"
              inputProps={{ 'aria-label': 'controlled' }}
              size="small"
            />
            <Typography
              variant="body2"
              sx={{
                color: isComplex ? 'secondary.main' : 'text.disabled',
                fontWeight: 'bold',
              }}
            >
              Complex
            </Typography>
          </Box>
          {!isComplex ? (
            <RadioGroup value={selectedPayType} onChange={handlePayStructureChange}>
              <RadioControl value="FlatRate" disabled={false} />
              <RadioControl value="TimedPay" />
              <RadioControl value="Pool" />
            </RadioGroup>
          ) : (
            <RadioGroup value={selectedPayType} onChange={handlePayStructureChange}>
              <RadioControl value="ParticipationPool" />
              <RadioControl value="SteppedFlatRate" />
              <RadioControl value="WeightedPool" />
              <RadioControl value="WeightedTimedPay" />
            </RadioGroup>
          )}
        </FormControl>
        <Box
          data-id="PayrollSetup_Wrapper"
          sx={{ display: 'flex', ml: 'auto', mr: 'auto' }}
        >
          <FormControl>
            <FormLabel
              sx={{ mb: 'auto', fontSize: '.9em', fontWeight: 'bold' }}
              color="secondary"
            >
              Payroll Details
            </FormLabel>
            {renderPayrollSetupComponent()}
          </FormControl>
        </Box>
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={formData.bonusPay}
              onChange={handleBonusPayChange}
            />
          }
          label="Bonus Pay"
          componentsProps={{
            typography: {
              variant: 'body2',
            },
          }}
        />
        <FormControlLabel
          control={
            <Switch
              size="small"
              color="secondary"
              checked={formData.allowBargaining}
              onChange={handleAllowBargainingChange}
            />
          }
          label="Allow Bargaining"
          componentsProps={{
            typography: {
              variant: 'body2',
              color: 'primary.main',
            },
          }}
        />
      </Box>
    </Box>
  );
};
