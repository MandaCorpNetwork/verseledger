// import { QuickTimeButton } from '@Common/Components/App/QuickTimeButton';
import { SelectTimeButton } from '@Common/Components/App/SelectTimeButton';
import { Close } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

import { LargeEmergencyOverlay } from '../EmergencyOverlay';

export const TimeInformation: React.FC<{
  formData: ICreateContractBody;
  setFormData: React.Dispatch<React.SetStateAction<ICreateContractBody>>;
}> = (props) => {
  const { formData, setFormData } = props;
  const [heldDate, setHeldDate] = React.useState<Date | null>(null);
  const [afterBiddingChecked, setAfterBiddingChecked] = React.useState(false);
  const [manualControlled, setManualControlled] = React.useState(false);

  const handleAfterBiddingCheck = React.useCallback(() => {
    setAfterBiddingChecked((prevChecked) => {
      const newChecked = !prevChecked;
      if (newChecked) {
        const bidDate = dayjs(formData.bidDate);
        const startDate = bidDate.add(10, 'second').toDate();
        setFormData({ ...formData, startDate: startDate ?? null });
      } else {
        setFormData({ ...formData, startDate: undefined });
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
          return;
        }
        if (formData.endDate && newDate > formData.endDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'Bid Date must be before End Date',
          });
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
          return;
        }
        if (formData.endDate && newDate > formData.endDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'Start Date must be before End Date',
          });
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
          return;
        }
        if (formData.bidDate && newDate < formData.bidDate) {
          enqueueSnackbar({
            variant: 'error',
            message: 'End Date must be after Bid Date',
          });
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
        }}
      >
        <Box
          data-testid="TimeInformation-Form__ManualSwitch_Container"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            mb: '1em',
          }}
        >
          <Box
            data-testid="TimeInformation-Form__ManualSwitch_Wrapper"
            sx={{
              display: 'inherit',
              flexDirection: 'row',
              alignItems: 'center',
              px: '.5em',
              py: '.2em',
              borderLeft: '2px solid',
              borderRight: '2px solid',
              borderColor: 'rgb(0,30,100)',
              borderRadius: '5px',
              borderTop: '1px solid rgb(0,30,100)',
              borderBottom: '1px solid rgb(0,30,100)',
              boxShadow: '0 0 10px 3px rgb(0,30,100)',
              backgroundImage:
                'linear-gradient(145deg, rgba(0,73,130,.3), rgba(8,22,80,0.77))',
              transition: 'all 0.3s ease-in-out',
              width: '300px',
              justifyContent: 'center',
              '&:hover': {
                borderColor: 'secondary.main',
                borderTop: '1px solid rgb(0,30,100)',
                borderBottom: '1px solid rgb(0,30,100)',
                boxShadow: '0 0 10px 5px rgb(0,30,100)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mr: '1em',
                borderRadius: '10px',
                fontWeight: !manualControlled ? 'bold' : 'normal',
                color: !manualControlled ? 'secondary.main' : 'text.secondary',
                backgroundImage: !manualControlled
                  ? 'linear-gradient(145deg, rgba(0,180,255,0.3), rgba(0,73,130,.77))'
                  : 'linear-gradient(145deg, rgba(0,0,0,.2), rgba(0,0,0,.5))',
                boxShadow: !manualControlled
                  ? '0 0 5px 2px rgba(0,180,255,.5)'
                  : '0 0 5px 1px rgba(0,0,0,0.5)',
                textShadow: !manualControlled ? '0 0 5px rgba(0,180,255,.5)' : 'none',
                width: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                display: 'flex',
                px: '.2em',
                cursor: 'default',
              }}
            >
              Manual
            </Typography>
            <Switch
              color="secondary"
              checked={manualControlled}
              onChange={() => setManualControlled((prev) => !prev)}
              disabled={formData.isEmergency}
            />
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'default',
                ml: '1em',
                px: '.3em',
                borderRadius: '10px',
                fontWeight: manualControlled ? 'bold' : 'normal',
                color: formData.isEmergency
                  ? 'text.disabled'
                  : manualControlled
                    ? 'secondary.main'
                    : 'text.secondary',
                backgroundImage: manualControlled
                  ? 'linear-gradient(145deg, rgba(0,180,255,0.3), rgba(0,73,130,.77))'
                  : 'linear-gradient(145deg, rgba(0,0,0,.2), rgba(0,0,0,.5))',
                boxShadow: formData.isEmergency
                  ? 'none'
                  : manualControlled
                    ? '0 0 5px 2px rgba(0,180,255,.5)'
                    : '0 0 5px 1px rgba(0,0,0,0.5)',
                textShadow: manualControlled ? '0 0 5px rgba(0,180,255,.5)' : 'none',
                '$.Mui-disabled': {
                  color: 'text.disabled',
                  textShadow: 'none',
                  boxShadow: 'none',
                  backgroundImage:
                    'linear-gradient(145deg, rgba(0,0,0,.2), rgba(0,0,0,.5))',
                },
              }}
            >
              Automatic
            </Typography>
          </Box>
        </Box>
        <Box
          data-testid="TimeInformation-Form__ControlMessage_Wrapper"
          sx={{
            display: 'flex',
            mb: '1em',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {!manualControlled ? (
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
                Manually Controlling Times allows the user to trigger events in the
                Contract Manager on the Personal Ledger.
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
          ) : (
            <>
              <Typography
                align="center"
                variant="tip"
                sx={{
                  maxWidth: '400px',
                }}
              >
                Unselected Times are manually controlled in the Contract Manager on the
                Personal Ledger
              </Typography>
            </>
          )}
        </Box>
        <Box
          data-testid="TimeInformation-form-DateBoxWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            position: 'relative',
          }}
        >
          {formData.isEmergency && <LargeEmergencyOverlay />}
          <TextField
            label="Bid Date"
            color="secondary"
            value={formatDate(formData.bidDate as Date)}
            inputProps={{ style: { textAlign: 'center' } }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <SelectTimeButton
                  onDateChange={(newDate) => setHeldDate(newDate)}
                  onTimeChange={(newTime) => handleTimeChange(newTime, 'bidDate')}
                />
              ),
              endAdornment: formData.bidDate && (
                <IconButton
                  data-testid="TimeInformation-Form-DateBox__BidDateControl_ClearButton"
                  onClick={() => setFormData({ ...formData, bidDate: undefined })}
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
              label="Start Date"
              color="secondary"
              value={formatDate(formData.startDate as Date)}
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <SelectTimeButton
                    onDateChange={(newDate) => setHeldDate(newDate)}
                    onTimeChange={(newTime) => handleTimeChange(newTime, 'startDate')}
                  />
                ),
                endAdornment: formData.startDate && (
                  <IconButton
                    data-testid="TimeInformation-Form-DateBox__StartDateControl_ClearButton"
                    onClick={() => setFormData({ ...formData, startDate: undefined })}
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
              }}
            />
          </Box>
          <TextField
            label="End Date"
            color="secondary"
            value={formatDate(formData.endDate as Date)}
            inputProps={{ style: { textAlign: 'center' } }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <SelectTimeButton
                  onDateChange={(newDate) => setHeldDate(newDate)}
                  onTimeChange={(newTime) => handleTimeChange(newTime, 'endDate')}
                />
              ),
              endAdornment: formData.endDate && (
                <IconButton
                  data-testid="TimeInformation-Form-DateBox__EndDateControl_ClearButton"
                  onClick={() => setFormData({ ...formData, endDate: undefined })}
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
