import { NotificationsActive, Schedule } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  Popper,
  Radio,
  TextField,
  Typography,
} from '@mui/material';
import { DateCalendar, DigitalClock } from '@mui/x-date-pickers';
import * as dayjs from 'dayjs';
import React from 'react';

import { addDates } from '@/Utils/utilityFunction';

type TimeInfoFormProps = {};

type QuickTimeButtonProps = {
  time: string;
};

const QuickTimeButton: React.FC<QuickTimeButtonProps> = ({ time }) => {
  return <Button variant="contained">{time}</Button>;
};

type SelectTimeProps = {
  onDateChange: (newDate: Date) => void;
  onTimeChange: (newTime: Date) => void;
};

const SelectTimeButton: React.FC<SelectTimeProps> = ({ onDateChange, onTimeChange }) => {
  const [anchorEl, setAnchorE1] = React.useState<null | HTMLElement>(null);
  const openCalendar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE1(anchorEl ? null : event.currentTarget);
  };
  const [view, setView] = React.useState('date');
  const handleDateChange = (newDate: Date) => {
    onDateChange(newDate);
    setView('time');
  };
  const handleTimeChange = (newTime: Date) => {
    onTimeChange(newTime);
    setAnchorE1(null);
    setView('date');
  };
  return (
    <>
      <IconButton color="secondary" size="large" onClick={openCalendar}>
        <Schedule />
      </IconButton>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        disablePortal={true}
        sx={{ zIndex: '5', bgcolor: 'rgba(0, 29, 68, 1)', backdropFilter: 'blur(5px)' }}
      >
        <Box>
          {view === 'date' && (
            <DateCalendar
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              disablePast={true}
              onChange={handleDateChange}
              slotProps={{
                leftArrowIcon: {
                  color: 'secondary',
                },
                rightArrowIcon: {
                  color: 'secondary',
                },
                switchViewButton: {
                  color: 'secondary',
                },
                day: {
                  sx: {
                    color: 'secondary.main',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'secondary.main',
                    },
                    '&.Mui-selected:focus': {
                      backgroundColor: 'primary.main',
                    },
                    '&.MuiPickersDay-dayOutsideMonth': {
                      color: 'primary.main',
                    },
                  },
                },
              }}
            />
          )}
          {view === 'time' && <DigitalClock ampm={false} onChange={handleTimeChange} />}
        </Box>
      </Popper>
    </>
  );
};

export const TimeInfoForm: React.FC<TimeInfoFormProps> = () => {
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
    <Box>
      <FormLabel>Time Info</FormLabel>
      <Box>
        <FormLabel>Bid Time:</FormLabel>
        <SelectTimeButton
          onDateChange={setSelectedBidTime}
          onTimeChange={(newTime) => {
            setSelectedBidTime((prev) => (prev ? addDates(prev, newTime) : newTime));
          }}
        />
        <QuickTimeButton time="30 min" />
        <QuickTimeButton time="1 hr" />
        <QuickTimeButton time="2 hr" />
        <QuickTimeButton time="4 hr" />
        <QuickTimeButton time="8 hr" />
        <TextField
          label="Bid Time"
          inputProps={{ readOnly: true }}
          value={format(selectedBidTime)}
          sx={{
            width: '10em',
            height: '1.5em',
          }}
        />
      </Box>
      <Box>
        <FormLabel>Duration:</FormLabel>
        <SelectTimeButton
          onDateChange={setSelectedDuration}
          onTimeChange={(newTime) => {
            setSelectedDuration((prev) => (prev ? addDates(prev, newTime) : newTime));
          }}
        />
        <QuickTimeButton time="30 min" />
        <QuickTimeButton time="1 hr" />
        <QuickTimeButton time="2 hr" />
        <QuickTimeButton time="4 hr" />
        <QuickTimeButton time="8 hr" />
        <TextField
          label="Duration"
          inputProps={{ readOnly: true }}
          value={format(selectedDuration)}
          sx={{
            width: '10em',
            height: '1.5em',
          }}
        />
      </Box>
      <Box>
        <FormLabel>Start Time:</FormLabel>
        <SelectTimeButton
          onDateChange={setSelectedStartTime}
          onTimeChange={(newTime) => {
            setSelectedStartTime((prev) => (prev ? addDates(prev, newTime) : newTime));
          }} />
        <FormControlLabel control={<Radio />} label="After Bidding" />
        <TextField
          label="Start Time"
          inputProps={{ readOnly: true }}
          value={format(selectedStartTime)}
          sx={{
            width: '10em',
            height: '1.5em',
          }}
        />
      </Box>
      <Box>
        <Button variant="contained" color="error" startIcon={<NotificationsActive />}>
          <Typography>Emergency</Typography>
        </Button>
      </Box>
    </Box>
  );
};
