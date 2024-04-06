import { Schedule } from "@mui/icons-material";
import { Box, IconButton, Popper } from '@mui/material';
import { DateCalendar, DigitalClock } from "@mui/x-date-pickers";
import React from "react";

type SelectTimeProps = {
  onDateChange: (newDate: Date) => void;
  onTimeChange: (newTime: Date) => void;
};

export const SelectTimeButton: React.FC<SelectTimeProps> = ({ onDateChange, onTimeChange }) => {
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
