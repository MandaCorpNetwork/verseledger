// import { QuickTimeButton } from '@Common/Components/App/QuickTimeButton';
import { SelectTimeButton } from '@Common/Components/App/SelectTimeButton';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
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
        console.error('No date was selected.');
        return;
      }
      const dateSelected = dayjs(heldDate);
      const timeSelected = dayjs(newTime);
      const combinedDateTime = dateSelected
        .set('hour', timeSelected.hour())
        .set('minute', timeSelected.minute());

      if (field === 'bidDate') {
        setFormData({ ...formData, bidDate: combinedDateTime.toDate() ?? null });
      }
      if (field === 'startDate') {
        setFormData({ ...formData, startDate: combinedDateTime.toDate() ?? null });
      }
      if (field === 'endDate') {
        setFormData({ ...formData, endDate: combinedDateTime.toDate() ?? null });
      }
    },
    [heldDate, setFormData],
  );

  const formatDate = React.useCallback((date: Date | null) => {
    if (date == null) {
      return 'Manually Controlled';
    }
    return dayjs(date).format('D/M/YY HH:mm');
  }, []);

  const toggleEmergencyMode = React.useCallback(() => {
    console.log(formData.isEmergency);
    if (formData.isEmergency) {
      setFormData({ ...formData, isEmergency: false });
    } else {
      setFormData({ ...formData, isEmergency: true });
    }
  }, [formData, setFormData]);

  const checkEmergencyAvailable = () => {
    if (
      formData.subtype == 'Transport' ||
      formData.subtype == 'Trauma' ||
      formData.subtype == 'Escort' ||
      formData.subtype == 'QRF' ||
      formData.subtype == 'Refuel' ||
      formData.subtype == 'Rearm' ||
      formData.subtype == 'Repair' ||
      formData.subtype == 'Middleman' ||
      formData.subtype == 'Redacted'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const emergencyAvailable = checkEmergencyAvailable();

  return (
    <Box
      data-testid="TimeInformation__Container"
      sx={{
        mt: '1em',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box data-testid="TimeInformation-form">
        <FormControl
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
        >
          <Box
            data-testid="TimeInformation-form-DateBoxWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '220px',
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
              }}
              sx={{
                my: '.5em',
                maxWidth: '220px',
              }}
            />
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
              }}
              sx={{
                my: '.5em',
                maxWidth: '220px',
              }}
            />
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
              }}
              sx={{
                my: '.5em',
                maxWidth: '220px',
              }}
            />
          </Box>
          <Box
            data-testid="TimeInformation-form-ManipulationContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* <Typography
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
            </Box> */}
            <Box
              sx={{
                maxWidth: '300px',
              }}
            >
              <Typography
                align="center"
                variant="body2"
                sx={{
                  color: 'info.main',
                  fontSize: '.75em',
                }}
              >
                Unselected Times are manually controlled in the Contract Manager on the
                Personal Ledger
              </Typography>
            </Box>
            <Box
              data-testid="TimeInformation-formManipulation__StartAfterBiddingWrapper"
              sx={{
                ml: '2em',
                mt: '1em',
                position: 'relative',
              }}
            >
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
            <Box
              data-testid="EmergencyButton-Wrapper"
              sx={{
                my: 'auto',
                mx: 'auto',
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={toggleEmergencyMode}
                disabled={!emergencyAvailable}
              >
                Emergency
              </Button>
            </Box>
            {formData.isEmergency && (
              <Typography align="center" variant="body2" sx={{ color: 'info.main' }}>
                Emergency Mode disables some features.
              </Typography>
            )}
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
