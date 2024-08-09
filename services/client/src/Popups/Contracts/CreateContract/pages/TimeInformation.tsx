// import { QuickTimeButton } from '@Common/Components/App/QuickTimeButton';
import { SelectTimeButton } from '@Common/Components/Buttons/SelectTimeButton';
import { Close } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { isMobile } from '@Utils/isMobile';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

import { LargeEmergencyOverlay } from '../EmergencyOverlay';

export const TimeInformation: React.FC<{
  formData: Partial<ICreateContractBody>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ICreateContractBody>>>;
}> = (props) => {
  const { playSound } = useSoundEffect();
  const mobile = isMobile();
  const { formData, setFormData } = props;
  const [heldDate, setHeldDate] = React.useState<Date | null>(null);
  const [afterBiddingChecked, setAfterBiddingChecked] = React.useState(false);

  const handleAfterBiddingCheck = React.useCallback(() => {
    setAfterBiddingChecked((prevChecked) => {
      const newChecked = !prevChecked;
      if (newChecked) {
        const bidDate = dayjs(formData.bidDate);
        const startDate = bidDate.add(10, 'second').toDate();
        playSound('clickMain');
        setFormData({ ...formData, startDate: startDate ?? null });
      }
      return newChecked;
    });
  }, [formData, setFormData]);

  const handleTimeChange = React.useCallback(
    (newTime: Date, field: string) => {
      if (!heldDate) {
        enqueueSnackbar({
          variant: 'error',
          message: 'Please select a date first',
        });
        playSound('error');
        return;
      }
      const dateSelected = dayjs(heldDate);
      const timeSelected = dayjs(newTime);
      const combinedDateTime = dateSelected
        .set('hour', timeSelected.hour())
        .set('minute', timeSelected.minute());

      const newDate = combinedDateTime.toDate();

      if (field === 'bidDate') {
        if (formData.startDate && newDate > formData.startDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'Bid Date must be before Start Date',
          });
          playSound('denied');
          return;
        }
        if (formData.endDate && newDate > formData.endDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'Bid Date must be before End Date',
          });
          playSound('denied');
          return;
        }
        setFormData({ ...formData, bidDate: newDate ?? null });
      }
      if (field === 'startDate') {
        if (formData.bidDate && newDate < formData.bidDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'Start Date must be after Bid Date',
          });
          playSound('denied');
          return;
        }
        if (formData.endDate && newDate > formData.endDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'Start Date must be before End Date',
          });
          playSound('denied');
          return;
        }
        setFormData({ ...formData, startDate: newDate ?? null });
      }
      if (field === 'endDate') {
        if (formData.startDate && newDate < formData.startDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'End Date must be after Start Date',
          });
          playSound('denied');
          return;
        }
        if (formData.bidDate && newDate < formData.bidDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'End Date must be after Bid Date',
          });
          playSound('denied');
          return;
        }
        setFormData({ ...formData, endDate: newDate ?? null });
      }
    },
    [heldDate, setFormData],
  );

  const formatDate = React.useCallback((date: Date | null) => {
    if (date == null) {
      return 'Manual Control';
    }
    return dayjs(date).format('D/M/YY HH:mm');
  }, []);

  return (
    <Box
      data-testid="TimeInformation__Container"
      sx={{
        mt: '1em',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1em',
        }}
      >
        {mobile && <FormLabel>Time Information</FormLabel>}
        <Box
          data-testid="TimeInformation-Form__ControlMessage_Wrapper"
          sx={{
            display: 'flex',
            mb: '1em',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.5em',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="tip"
              align="center"
              sx={{
                maxWidth: '400px',
              }}
            >
              Manual Controlled Times require you to trigger the event in the Contract
              Manager on Personal Ledger. Set a time to make it automatic.
            </Typography>
            {formData.isEmergency && (
              <Typography
                variant="tip"
                align="center"
                sx={{
                  px: '1em',
                }}
              >
                Emergency Contracts must be manually controlled.
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          data-testid="TimeInformation-form-DateBoxWrapper"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '1em',
            position: 'relative',
            width: '100%',
            alignItems: { xs: 'center', md: 'stretch' },
          }}
        >
          {formData.isEmergency && <LargeEmergencyOverlay />}
          <TextField
            label="Bid End Date"
            color="secondary"
            value={formatDate(formData.bidDate as Date)}
            inputProps={{ style: { textAlign: 'center', cursor: 'default' } }}
            InputProps={{
              readOnly: true,
              sx: {
                cursor: 'default',
              },
              startAdornment: (
                <SelectTimeButton
                  onDateChange={(newDate) => setHeldDate(newDate)}
                  onTimeChange={(newTime) => handleTimeChange(newTime, 'bidDate')}
                />
              ),
              endAdornment: formData.bidDate && (
                <IconButton
                  data-testid="TimeInformation-Form-DateBox__BidDateControl_ClearButton"
                  onClick={() => {
                    setFormData({ ...formData, bidDate: null });
                    playSound('clickMain');
                  }}
                >
                  <Close />
                </IconButton>
              ),
            }}
            sx={{
              my: '.5em',
              maxWidth: '220px',
            }}
          />
          <Box
            data-testid="TimeInformation-Form-DateBox__StartDateControl_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <TextField
              label="Contract Start Date"
              color="secondary"
              value={formatDate(formData.startDate as Date)}
              inputProps={{ style: { textAlign: 'center', cursor: 'default' } }}
              InputProps={{
                readOnly: true,
                sx: {
                  cursor: 'default',
                },
                startAdornment: (
                  <SelectTimeButton
                    onDateChange={(newDate) => setHeldDate(newDate)}
                    onTimeChange={(newTime) => handleTimeChange(newTime, 'startDate')}
                  />
                ),
                endAdornment: formData.startDate && (
                  <IconButton
                    data-testid="TimeInformation-Form-DateBox__StartDateControl_ClearButton"
                    onClick={() => {
                      setFormData({ ...formData, startDate: null });
                      playSound('clickMain');
                    }}
                  >
                    <Close />
                  </IconButton>
                ),
              }}
              sx={{
                my: '.5em',
                maxWidth: '220px',
              }}
            />
            <FormControlLabel
              data-testid="startafterbidding-checkbox"
              control={
                <Checkbox
                  color="secondary"
                  checked={afterBiddingChecked}
                  onChange={handleAfterBiddingCheck}
                  disabled={formData.bidDate == null}
                />
              }
              label="Start After Bidding"
              sx={{
                color: 'text.secondary',
                mx: { xs: '0', md: 'auto' },
              }}
            />
          </Box>
          <TextField
            label="Contract End Date"
            color="secondary"
            value={formatDate(formData.endDate as Date)}
            inputProps={{ style: { textAlign: 'center', cursor: 'default' } }}
            InputProps={{
              readOnly: true,
              sx: {
                cursor: 'default',
              },
              startAdornment: (
                <SelectTimeButton
                  onDateChange={(newDate) => setHeldDate(newDate)}
                  onTimeChange={(newTime) => handleTimeChange(newTime, 'endDate')}
                />
              ),
              endAdornment: formData.endDate && (
                <IconButton
                  data-testid="TimeInformation-Form-DateBox__EndDateControl_ClearButton"
                  onClick={() => {
                    setFormData({ ...formData, endDate: null });
                    playSound('clickMain');
                  }}
                >
                  <Close />
                </IconButton>
              ),
            }}
            sx={{
              my: '.5em',
              maxWidth: '220px',
            }}
          />
        </Box>
      </FormControl>
    </Box>
  );
};

/* 
  Quick Time Buttons for fast time manipulation.
  Need to be able to read which field is focused in order to utilize this functionality.
<Typography
              align="center"
              sx={{ color: 'text.secondary', fontWeight: 'bold', mb: '.5em' }}
            >
              Time From Now
            </Typography>
            <Box
              data-testid="TimeInformation-form-Manipulation__QuickTimeButtons"
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <QuickTimeButton time="30 min" onClick={() => {}} />
              <QuickTimeButton time="1 hr" onClick={() => {}} />
              <QuickTimeButton time="2 hr" onClick={() => {}} />
              <QuickTimeButton time="4 hr" onClick={() => {}} />
              <QuickTimeButton time="8 hr" onClick={() => {}} />
            </Box> */
