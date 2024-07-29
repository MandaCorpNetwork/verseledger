import { Schedule } from '@mui/icons-material';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import { DateCalendar, DigitalClock } from '@mui/x-date-pickers';
import { useSound } from '@Utils/Hooks/useSound';
// import { Logger } from '@Utils/Logger';
import React from 'react';

type SelectTimeProps = {
  onDateChange: (newDate: Date) => void;
  onTimeChange: (newTime: Date) => void;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
};

export const SelectTimeButton: React.FC<SelectTimeProps> = ({
  onDateChange,
  onTimeChange,
  color,
  disabled,
}) => {
  const playSound = useSound();
  const [anchorEl, setAnchorE1] = React.useState<null | HTMLElement>(null);
  const openCalendar = (event: React.MouseEvent<HTMLElement>) => {
    playSound('clickMain');
    setAnchorE1(anchorEl ? null : event.currentTarget);
  };
  const [view, setView] = React.useState('date');
  const handleDateChange = (newDate: Date) => {
    playSound('clickMain');
    onDateChange(newDate);
    setView('time');
  };
  const handleTimeChange = (newTime: Date) => {
    playSound('clickMain');
    onTimeChange(newTime);
    setView('date');
    setAnchorE1(null);
  };
  return (
    <>
      <IconButton
        data-testid="SelectTimeButton"
        color={color ? color : 'secondary'}
        size="large"
        onClick={openCalendar}
        disabled={disabled}
      >
        <Schedule />
      </IconButton>
      <Popover
        data-testid="SelectTimeForm__Popover"
        open={Boolean(anchorEl)}
        onClose={() => setAnchorE1(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{
          backdropFilter: 'blur(5px)',
        }}
      >
        <div>
          {view === 'date' && (
            <Box
              data-testid="SelectTimeForm__DateCalendar_Wrapper"
              sx={{
                borderTop: '2px solid',
                borderBottom: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
              <div>
                <Typography variant="tip" align="center" sx={{ px: '1em', mb: '1em' }}>
                  Times are in Your Local Time
                </Typography>
              </div>
            </Box>
          )}
          {view === 'time' && (
            <DigitalClock
              ampm={false}
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
        </div>
      </Popover>
    </>
  );
};
