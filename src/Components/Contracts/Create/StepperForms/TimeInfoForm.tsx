import { NotificationsActive, Schedule } from '@mui/icons-material';
import { Box, Button, FormControlLabel, FormLabel, IconButton, Popper,Radio, Typography } from '@mui/material';
import { DateCalendar, TimeClock} from '@mui/x-date-pickers';
import React from 'react';

type TimeInfoFormProps = {
};

type QuickTimeButtonProps = {
  time: string;
};

const QuickTimeButton: React.FC<QuickTimeButtonProps> = ({ time }) => {
  return <Button variant="contained">{time}</Button>;
};

const SelectTimeButton = () => {
  const [anchorEl, setAnchorE1] = React.useState<null | HTMLElement>(null);
  const openCalendar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE1(anchorEl ? null : event.currentTarget);
  };
  return (
    <>
      <IconButton color="secondary" size="large" onClick={openCalendar}>
        <Schedule />
      </IconButton>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <Box>
            <DateCalendar />
        </Box>
      </Popper>
    </>
  );
};

export const TimeInfoForm: React.FC<TimeInfoFormProps> = () => {
  return (
    <Box>
      <FormLabel>Time Info</FormLabel>
      <Box>
        <FormLabel>Bid Time:</FormLabel>
        <SelectTimeButton />
        <QuickTimeButton time="30 min" />
        <QuickTimeButton time="1 hr" />
        <QuickTimeButton time="2 hr" />
        <QuickTimeButton time="4 hr" />
        <QuickTimeButton time="8 hr" />
      </Box>
      <Box>
        <FormLabel>Duration:</FormLabel>
        <SelectTimeButton />
        <QuickTimeButton time="30 min" />
        <QuickTimeButton time="1 hr" />
        <QuickTimeButton time="2 hr" />
        <QuickTimeButton time="4 hr" />
        <QuickTimeButton time="8 hr" />
      </Box>
      <Box>
        <FormLabel>Start Time:</FormLabel>
        <SelectTimeButton />
        <FormControlLabel control={<Radio />} label="After Bidding" />
      </Box>
      <Box>
        <Button variant="contained" color="error" startIcon={<NotificationsActive />}>
          <Typography>Emergency</Typography>
        </Button>
      </Box>
    </Box>
  );
};
