import { HelpOutline } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { FlatRatePayroll, PoolPayroll, TimedPayroll } from './DefaultPay/Simple';

type RadioControlProps = {
  value: string;
  label: string;
  disabled?: boolean;
};

const RadioControl: React.FC<RadioControlProps> = ({ value, label, disabled }) => {
  return (
    <FormControlLabel
      control={<Radio size="small" color="secondary" />}
      label={label}
      value={value}
      disabled={disabled}
      color="secondary"
      componentsProps={{
        typography: {
          variant: 'body2',
        },
      }}
    />
  );
};

export const Payroll: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const [isComplex, setIsComplex] = React.useState(false);
  const [evenSplit, setEvenSplit] = React.useState(false);

  const dispatch = useAppDispatch();

  const handlePayStructureInfo = () => {
    dispatch(openPopup(POPUP_PAY_STRUCTURES));
  };

  const handleStuctureTypeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplex(event.target.checked);
  };

  const renderDefaultPayComponent = () => {
    switch (formData.payStructure) {
      case 'FLATRATE':
        return <FlatRatePayroll formData={formData} onChange={handleSetDefaultPay} />;
      case 'HOURLY':
        return <TimedPayroll formData={formData} onChange={handleSetDefaultPay} />;
      case 'POOL':
        return (
          <PoolPayroll
            formData={formData}
            onChange={handleSetDefaultPay}
            evenSplit={evenSplit}
            setEvenSplit={handleEvenSplitToggle}
          />
        );
      default:
        return;
    }
  };

  const handleSetDefaultPay = React.useCallback(
    (value: number) => {
      setFormData((formData) => ({
        ...formData,
        defaultPay: value,
      }));
    },
    [setFormData],
  );

  const handleEvenSplitToggle = React.useCallback(() => {
    if (evenSplit) {
      setEvenSplit(false);
      setFormData((formData) => ({
        ...formData,
        defaultPay: 5,
      }));
    }
    if (!evenSplit) {
      setEvenSplit(true);
      setFormData((formData) => ({
        ...formData,
        defaultPay: 50,
      }));
    }
  }, [evenSplit, setEvenSplit, setFormData]);

  return (
    <Box
      data-testid="Payroll__Container"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mt: '1em',
        justifyContent: 'space-around',
      }}
    >
      <FormControl
        data-testid="Payroll__PayStructure__Form"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          minHeight: '220px',
        }}
      >
        <Box>
          <FormLabel color="secondary">
            Pay Structure
            <IconButton
              color="info"
              size="small"
              sx={{ position: 'relative' }}
              onClick={handlePayStructureInfo}
            >
              <HelpOutline fontSize="small" sx={{ color: 'gray' }} />
            </IconButton>
          </FormLabel>
          <Box
            data-testid="Payroll-PayStructureForm__Switch-Wrapper"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isComplex ? 'text.disabled' : 'secondary.main',
                fontWeight: 'bold',
                pr: '.5em',
              }}
            >
              Simple
            </Typography>
            <Switch
              checked={isComplex}
              color="secondary"
              size="small"
              inputProps={{ 'aria-label': 'controlled' }}
              onChange={handleStuctureTypeSwitch}
            />
            <Typography
              variant="body2"
              sx={{
                color: isComplex ? 'secondary.main' : 'text.disabled',
                fontWeight: 'bold',
                pl: '.5em',
              }}
            >
              Complex
            </Typography>
          </Box>
          <Box
            data-testid="Payroll-PayStructureForm__Radio-Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {!isComplex ? (
              <RadioGroup
                value={formData.payStructure}
                defaultValue="FLATRATE"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    payStructure: e.target.value as ContractPayStructure,
                  });
                }}
              >
                <RadioControl value="FLATRATE" label="Flat Rate" />
                <RadioControl value="HOURLY" label="Time Rate" />
                <RadioControl value="POOL" label="Pool" />
              </RadioGroup>
            ) : (
              <RadioGroup value={formData.payStructure}>
                <RadioControl
                  value="PARTICIPATIONPOOL"
                  label="Particpation Pool"
                  disabled={true}
                />
                <RadioControl
                  value="STEPPEDFLATRATE"
                  label="Stepped Flat Rate"
                  disabled={true}
                />
                <RadioControl
                  value="WEIGHTEDPOOL"
                  label="Weighted Pool"
                  disabled={true}
                />
                <RadioControl
                  value="WEIGHTEDTIME"
                  label="Weighted Time Pay"
                  disabled={true}
                />
              </RadioGroup>
            )}
          </Box>
        </Box>
      </FormControl>
      <FormControl
        data-testid="Payroll-DefaultPay__Form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <FormLabel color="secondary">Default Pay</FormLabel>
        <Box data-testid="Payroll-DefaultPay__Wrapper">{renderDefaultPayComponent()}</Box>
      </FormControl>
      <FormControl>
        <Box
          data-testid="PayrollForm-DefaultPay__OptionsWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormLabel color="secondary">Options</FormLabel>
          <Tooltip title="Allows the Bidder to Negotiate their Pay">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="secondary"
                  checked={formData.isBargaining}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      isBargaining: e.target.checked,
                    });
                  }}
                />
              }
              label="Allow Barganing"
              componentsProps={{
                typography: {
                  variant: 'body2',
                },
              }}
            />
          </Tooltip>
          <Tooltip title="Notifies Bidders of possible undisclosed pay">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="secondary"
                  checked={formData.isBonusPay}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      isBonusPay: e.target.checked,
                    });
                  }}
                />
              }
              label="Bonus Pay"
              componentsProps={{
                typography: {
                  variant: 'body2',
                },
              }}
            />
          </Tooltip>
        </Box>
      </FormControl>
    </Box>
  );
};
