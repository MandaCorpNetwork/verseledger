import { ClearIcon, DateTimePicker } from '@mui/x-date-pickers';
import { SmallTimeField } from './TimeField';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { CalendarToday, Clear } from '@mui/icons-material';

type TimePickerProps = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  size: 'small' | 'medium';
  ['data-testid']?: string;
  isDisabled?: boolean;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  size = 'small',
  'data-testid': testid = 'field',
  isDisabled = false,
}) => {
  return (
    <DateTimePicker
      ampm={false}
      ampmInClock={false}
      disabled={isDisabled}
      disablePast
      label={label}
      showDaysOutsideCurrentMonth={true}
      timezone="system"
      thresholdToRenderTimeInASingleColumn={300}
      skipDisabled
      slotProps={{
        actionBar: {
          actions: ['clear', 'today'],
          sx: {
            '& .MuiButton-root': {
              color: 'secondary.main',
              background:
                'linear-gradient(135deg, rgba(0,101,180) 25%, rgba(0,46,130) 75%)',
              border: '1px solid rgba(0,101,180)',
              boxShadow:
                '0 3px 5px 0px rgba(121,192,244,.4), inset 0 1px 1px rgba(0,0,0,0.3)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background:
                  'linear-gradient(135deg, rgba(0,90,160) 25%, rgba(0,40,120) 75%)',
                boxShadow:
                  '0 3px 5px 0px rgba(121,192,244,.2), inset 0 1px 1px rgba(0,0,0,0.3)',
              },
              '&:active': {
                boxShadow: '0 3px 5px 2px rgba(121,192,244,.5)',
              },
              '&:focus-visible': {
                outline: '2px solid rgba(121,192,244,0.7)',
                outlineOffset: '2px',
              },
              '& .MuiTouchRipple-root': {
                color: 'rgba(121,192,244,.5)',
              },
            },
          },
        },
        day: {
          sx: {
            color: 'secondary.main',
            '&.Mui-selected': {
              backgroundColor: 'text.secondary',
              color: 'secondary.main',
            },
            '&.Mui-selected:focus': {
              backgroundColor: 'text.secondary',
            },
            '&.MuiPickersDay-dayOutsideMonth': {
              color: 'text.secondary',
            },
          },
        },
        desktopPaper: {
          sx: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            background: 'linear-gradient(135deg, rgba(14,35,141), rgba(8,22,80))',
            boxShadow:
              '0 1px 2px rgba(33,150,243,.4), 0 2px 4px rgba(33,150,243,.3), 0 4px 8px rgba(33,150,243,.2), 0 8px 16px rgba(33,150,243,.1), 0 16px 32px rgba(0,9,16,.05), inset 0 1px 2px rgba(0,9,16,.05), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05), inset 0 8px 16px rgba(0,9,16,.05), inset 0 16px 32px rgba(0,9,16,.05)',
            borderRadius: '10px',
          },
        },
        textField: {
          size: 'small',
          color: 'secondary',
          InputProps: {
            sx: {
              fontSize: '.8em',
            },
          },
          inputProps: {
            sx: {
              cursor: 'default',
            },
          },
          sx: {
            maxWidth: '200px',
            cursor: 'default',
          },
        },
        dialog: {
          sx: {
            backdropFilter: 'blur(5px)',
            bgcolor: 'rgba(0,1,19,.4)',
          },
        },
        digitalClockItem: {
          sx: {
            fontSize: '.8em',
            color: 'text.secondary',
          },
        },
        field: {
          clearable: true,
        },
      }}
    />
  );
};
