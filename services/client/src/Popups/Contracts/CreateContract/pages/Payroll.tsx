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
import { useIsMobile } from '@Utils/isMobile';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

import { LargeEmergencyOverlay } from '../EmergencyOverlay';
import { FlatRatePayroll, PoolPayroll, TimedPayroll } from './Simple';

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
  formData: Partial<ICreateContractBody>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ICreateContractBody>>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const [isComplex, setIsComplex] = React.useState(false);
  const [evenSplit, setEvenSplit] = React.useState(false);

  const dispatch = useAppDispatch();
  const mobile = useIsMobile();

  const handlePayStructureInfo = () => {
    dispatch(openPopup(POPUP_PAY_STRUCTURES));
  };

  const handleStuctureTypeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplex(event.target.checked);
  };

  const handleSetDefaultPay = (value: string) => {
    setFormData((prevFormData) => {
      const updatedPay = { ...prevFormData, defaultPay: +filterNumericInput(value) };
      return updatedPay;
    });
  };

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

  const filterNumericInput = (input: string) => {
    // Filter out non-numeric characters
    const invalidCharacters = input.match(/\D+/g);

    if (invalidCharacters) {
      enqueueSnackbar('Please only use numbers', { variant: 'error' });
    }
    return input.replace(/\D+/g, '');
  };

  return (
    <Box
      data-testid="Payroll__Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '2em',
        width: '100%',
      }}
    >
      <Box
        data-testid="Payroll-Form__TopBox"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          gap: '1em',
          alignItems: { xs: 'center', md: 'stretch' },
        }}
      >
        <FormControl
          data-testid="Payroll__PayStructure__Form"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            minHeight: '220px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {mobile && <FormLabel>Payroll</FormLabel>}
          <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {formData.isEmergency && <LargeEmergencyOverlay />}
            <FormLabel color="secondary">
              Pay Structure
              <IconButton
                color="info"
                size="small"
                sx={{ position: 'relative' }}
                onClick={handlePayStructureInfo}
              >
                <HelpOutline fontSize="small" sx={{ color: 'info.main' }} />
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
            gap: '1em',
          }}
        >
          <FormLabel color="secondary">Default Pay</FormLabel>
          <Box data-testid="Payroll-DefaultPay__Wrapper">
            {formData.payStructure === 'FLATRATE' && (
              <FlatRatePayroll formData={formData} onChange={handleSetDefaultPay} />
            )}
            {formData.payStructure === 'HOURLY' && (
              <TimedPayroll formData={formData} onChange={handleSetDefaultPay} />
            )}
            {formData.payStructure === 'POOL' && (
              <PoolPayroll
                formData={formData}
                onChange={handleSetDefaultPay}
                evenSplit={evenSplit}
                setEvenSplit={handleEvenSplitToggle}
              />
            )}
          </Box>
        </FormControl>
      </Box>
      <FormControl
        data-testid="PayrollForm-DefaultPay__OptionsContainer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          ml: '10%',
          mt: '1em',
        }}
      >
        {formData.isEmergency && <LargeEmergencyOverlay />}
        <FormLabel color="secondary">Options</FormLabel>
        <Box data-testid="PayrollForm-DefaultPay__Options_Wrapper">
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
