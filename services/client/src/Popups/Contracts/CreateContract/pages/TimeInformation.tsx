// import { QuickTimeButton } from '@Common/Components/App/QuickTimeButton';
import { TimePicker } from '@Common/Components/TextFields/TimePicker';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
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
  const { formData, setFormData } = props;

  const [afterBiddingChecked, setAfterBiddingChecked] = React.useState(false);

  const { playSound } = useSoundEffect();
  const mobile = useIsMobile();

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
  }, [formData, playSound, setFormData]);

  const handleTimeChange = React.useCallback(
    (newDate: Date | null, field: string) => {
      if (!newDate || newDate === null) {
        enqueueSnackbar({
          variant: 'error',
          message: 'Please select a date first',
        });
        playSound('error');
        return;
      }
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
    [setFormData, formData, playSound],
  );

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
          <TimePicker
            label="Bid End Date"
            value={formData.bidDate ?? null}
            onChange={(date) => handleTimeChange(date, 'bidDate')}
            onClear={() => setFormData({ ...formData, bidDate: null })}
          />
          <Box
            data-testid="TimeInformation-Form-DateBox__StartDateControl_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <TimePicker
              label="Start Date"
              value={formData.startDate ?? null}
              onChange={(date) => handleTimeChange(date, 'startDate')}
              onClear={() => setFormData({ ...formData, bidDate: null })}
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
          <TimePicker
            label="End Date"
            value={formData.endDate ?? null}
            onChange={(date) => handleTimeChange(date, 'endDate')}
            onClear={() => setFormData({ ...formData, bidDate: null })}
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
