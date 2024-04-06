import { NotificationsActive } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { QuickTimeButton } from './TimeInfoFormControls/QuickTimeButton';
import { SelectTimeButton } from './TimeInfoFormControls/SelectTimeButton';

type TimeInfoFormProps = {
  formData: {
    bidEnd: Date;
    startDate: Date;
    endDate: Date;
  };
  onFormChange: (field: string, value: Date | null) => void;
};

export const TimeInfoForm: React.FC<TimeInfoFormProps> = ({ formData, onFormChange }) => {
  const [selectedBidTime, setSelectedBidTime] = React.useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = React.useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = React.useState<Date | null>(null);

  // Handling Time Change from the SelectTimeButton
  const handleTimeChange = (
    newTime: Date,
    setTimeState: React.Dispatch<React.SetStateAction<Date | null>>,
    fieldName: keyof typeof formData,
  ) => {
    setTimeState((prevDateTime) => {
      if (prevDateTime) {
        const updatedDateTime = dayjs(prevDateTime)
          .hour(dayjs(newTime).hour())
          .minute(dayjs(newTime).minute())
          .toDate();
        onFormChange(fieldName, updatedDateTime);
        // Passes in the date to formData
        return updatedDateTime;
      }
      onFormChange(fieldName, newTime);
      // Passes in the date to formData

      return newTime;
    });
  };

  // Handling Time Change from the QuickTimeButton
  type AllowedUnitType = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

  const handleQuickTimeSelection = (
    duration: string,
    setTimeState: React.Dispatch<React.SetStateAction<Date | null>>,
    fieldName: keyof typeof formData,
  ) => {
    const [amount, unit] = duration.split(' ');

    // UnitType Error Handler
    if (!['year', 'month', 'week', 'day', 'hour', 'minute', 'second'].includes(unit)) {
      console.error('Invalid unit type of date', unit);
      return;
    }

    const newTime = dayjs()
      .add(parseInt(amount, 10), unit as AllowedUnitType)
      .toDate();
    onFormChange(fieldName, newTime);
    // Passes in the date to formData

    setTimeState(newTime);
  };

  // Handling Time Change from the After Bidding Checkbox
  const [afterBiddingChecked, setAfterBiddingChecked] = React.useState(false);

  const handleAfterBiddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAfterBiddingChecked(event.target.checked);
    if (event.target.checked && selectedBidTime) {
      const newStartTime = dayjs(selectedBidTime).add(1, 'second').toDate();
      onFormChange('startDate', newStartTime);
    }
  };

  // Handling Time Change from the BidTime for the StartTime when Checked
  React.useEffect(() => {
    if (afterBiddingChecked && selectedBidTime) {
      const newStartTime = dayjs(selectedBidTime).add(1, 'second').toDate();
      setSelectedStartTime(newStartTime);
    }
  }, [selectedBidTime, afterBiddingChecked]);

  const format = (date: Date | null) => {
    if (date) {
      return dayjs(date).format('MM/DD/YY HH:mm');
    } else {
      return '';
    }
  };

  return (
    <Box data-id="timeInfo-container">
      <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}>
        Time Info
      </FormLabel>
      <Box data-id="timeInfo-form" sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          data-id="timeInfo-form-controls"
          sx={{ display: 'flex', flexDirection: 'column', mt: 'auto', mb: 'auto' }}
        >
          <Box
            data-id="bidTime-form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormLabel>Bid Time:</FormLabel>
            <SelectTimeButton
              onDateChange={setSelectedBidTime}
              onTimeChange={(newTime) =>
                handleTimeChange(newTime, setSelectedBidTime, 'bidEnd')
              }
            />
            <QuickTimeButton
              time="30 min"
              onClick={() =>
                handleQuickTimeSelection('30 minute', setSelectedBidTime, 'bidEnd')
              }
            />
            <QuickTimeButton
              time="1 hr"
              onClick={() =>
                handleQuickTimeSelection('1 hour', setSelectedBidTime, 'bidEnd')
              }
            />
            <QuickTimeButton
              time="2 hr"
              onClick={() =>
                handleQuickTimeSelection('2 hour', setSelectedBidTime, 'bidEnd')
              }
            />
            <QuickTimeButton
              time="4 hr"
              onClick={() =>
                handleQuickTimeSelection('4 hour', setSelectedBidTime, 'bidEnd')
              }
            />
            <QuickTimeButton
              time="8 hr"
              onClick={() =>
                handleQuickTimeSelection('8 hour', setSelectedBidTime, 'bidEnd')
              }
            />
          </Box>
          <Box
            data-id="startTime-form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FormLabel>Start Time:</FormLabel>
            <Box
              data-id="startTime-form-controls"
              sx={{
                justifySelf: 'center',
              }}
            >
              <SelectTimeButton
                onDateChange={setSelectedStartTime}
                onTimeChange={(newTime) =>
                  handleTimeChange(newTime, setSelectedStartTime, 'startDate')
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={afterBiddingChecked}
                    onChange={handleAfterBiddingChange}
                  />
                }
                label="After Bidding"
                sx={{
                  color: 'text.secondary',
                }}
              />
            </Box>
          </Box>
          <Box
            data-id="endTime-form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormLabel>End Time:</FormLabel>
            <SelectTimeButton
              onDateChange={setSelectedEndTime}
              onTimeChange={(newTime) =>
                handleTimeChange(newTime, setSelectedEndTime, 'endDate')
              }
            />
            <QuickTimeButton
              time="30 min"
              onClick={() =>
                handleQuickTimeSelection('30 minute', setSelectedEndTime, 'endDate')
              }
            />
            <QuickTimeButton
              time="1 hr"
              onClick={() =>
                handleQuickTimeSelection('1 hour', setSelectedEndTime, 'endDate')
              }
            />
            <QuickTimeButton
              time="2 hr"
              onClick={() =>
                handleQuickTimeSelection('2 hour', setSelectedEndTime, 'endDate')
              }
            />
            <QuickTimeButton
              time="4 hr"
              onClick={() =>
                handleQuickTimeSelection('4 hour', setSelectedEndTime, 'endDate')
              }
            />
            <QuickTimeButton
              time="8 hr"
              onClick={() =>
                handleQuickTimeSelection('8 hour', setSelectedEndTime, 'endDate')
              }
            />
          </Box>
        </Box>
        <Box
          data-id="timeInfo-form-output"
          sx={{ display: 'flex', flexDirection: 'column', ml: '.5em', gap: '.5em' }}
        >
          <TextField
            label="Bid Time"
            inputProps={{ readOnly: true }}
            value={format(formData.bidEnd)}
            color="secondary"
            sx={{}}
          />
          <TextField
            label="Start Time"
            inputProps={{ readOnly: true }}
            value={format(formData.startDate)}
            color="secondary"
            sx={{}}
          />
          <TextField
            label="End Time"
            inputProps={{ readOnly: true }}
            value={format(formData.endDate)}
            color="secondary"
            sx={{}}
          />
        </Box>
      </Box>
      <Box
        data-id="timeInfo-form-emergency"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '.5em',
        }}
      >
        <Button variant="contained" color="error" startIcon={<NotificationsActive />}>
          <Typography>Emergency</Typography>
        </Button>
      </Box>
    </Box>
  );
};
