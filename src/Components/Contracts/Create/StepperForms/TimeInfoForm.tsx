import { NotificationsActive } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { addDates } from '@/Utils/utilityFunction';

import { QuickTimeButton } from './TimeInfoFormControls/QuickTimeButton';
import { SelectTimeButton } from './TimeInfoFormControls/SelectTimeButton';

export const TimeInfoForm: React.FC = () => {
  const [selectedBidTime, setSelectedBidTime] = React.useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = React.useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = React.useState<Date | null>(null);

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
              onTimeChange={(newTime) => {
                setSelectedBidTime((prev) =>
                  prev ? addDates(dayjs(prev), dayjs(newTime)).toDate() : newTime,
                );
              }}
            />
            <QuickTimeButton time="30 min" />
            <QuickTimeButton time="1 hr" />
            <QuickTimeButton time="2 hr" />
            <QuickTimeButton time="4 hr" />
            <QuickTimeButton time="8 hr" />
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
                onTimeChange={(newTime) => {
                  setSelectedStartTime((prev) =>
                    prev ? addDates(dayjs(prev), dayjs(newTime)).toDate() : newTime,
                  );
                }}
              />
              <FormControlLabel control={<Radio />} label="After Bidding" />
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
              onDateChange={setSelectedDuration}
              onTimeChange={(newTime) => {
                setSelectedDuration((prev) =>
                  prev ? addDates(dayjs(prev), dayjs(newTime)).toDate() : newTime,
                );
              }}
            />
            <QuickTimeButton time="30 min" />
            <QuickTimeButton time="1 hr" />
            <QuickTimeButton time="2 hr" />
            <QuickTimeButton time="4 hr" />
            <QuickTimeButton time="8 hr" />
          </Box>
        </Box>
        <Box
          data-id="timeInfo-form-output"
          sx={{ display: 'flex', flexDirection: 'column', ml: '.5em', gap: '.5em' }}
        >
          <TextField
            label="Bid Time"
            inputProps={{ readOnly: true }}
            value={format(selectedBidTime)}
            color="secondary"
            sx={{}}
          />
          <TextField
            label="Start Time"
            inputProps={{ readOnly: true }}
            value={format(selectedStartTime)}
            color="secondary"
            sx={{}}
          />
          <TextField
            label="End Time"
            inputProps={{ readOnly: true }}
            value={format(selectedDuration)}
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
