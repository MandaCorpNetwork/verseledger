import { Schedule } from '@mui/icons-material';
import { Box, IconButton, Popover } from '@mui/material';
import { DateCalendar, DigitalClock } from '@mui/x-date-pickers';
import React from 'react';

type SelectTimeProps = {
  onDateChange: (newDate: Date) => void;
  onTimeChange: (newTime: Date) => void;
};

export const SelectTimeButton: React.FC<SelectTimeProps> = ({
  onDateChange,
  onTimeChange,
}) => {
  const [anchorEl, setAnchorE1] = React.useState<null | HTMLElement>(null);
  const openCalendar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE1(anchorEl ? null : event.currentTarget);
  };
  const [view, setView] = React.useState('date');
  const handleDateChange = (newDate: Date) => {
    console.log(newDate);
    onDateChange(newDate);
    setView('time');
  };
  const handleTimeChange = (newTime: Date) => {
    console.log(newTime);
    onTimeChange(newTime);
    setView('date');
    setAnchorE1(null);
  };
  return (
    <>
      <IconButton color="secondary" size="large" onClick={openCalendar}>
        <Schedule />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorE1(null)}
        anchorEl={anchorEl}
        disablePortal={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          backdropFilter: 'blur(5px)',
        }}
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
              sx={{
                borderTop: '2px solid',
                borderBottom: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: '10px',
              }}
            />
          )}
          {view === 'time' && (
            <DigitalClock
              ampm={false}
              disablePast={true}
              onChange={handleTimeChange}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
                borderTop: '2px solid',
                borderBottom: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: '10px',
              }}
            />
          )}
        </Box>
      </Popover>
    </>
  );
};
