import { DateTimePicker, digitalClockClasses } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import type React from 'react';

/**
 * TimePicker Props
 */
type TimePickerProps = {
  /** Label passed to component */
  label: string;
  /** Value passed to component */
  value: Date | null;
  /** Callback function to handle changes */
  onChange: (date: Date | null) => void;
  /** Callback function to handle clearing */
  onClear: () => void;
  /** Size of components TextField & FontSize, default is small */
  size?: 'small' | 'medium';
  /** Test ID for component */
  'data-testid'?: string;
  /** Optional disabled flag */
  isDisabled?: boolean;
};

/**
 * TimePicker component for selecting a time.
 * Uses MUI's DateTimePicker component and customizes its appearance and behavior.
 * @param TimePickerProps - The props for the TimePicker component.
 * @returns The TimePicker component, & usage returns a Date object.
 */
export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  size = 'small',
  'data-testid': testid = 'field',
  isDisabled = false,
  onClear,
}) => {
  return (
    <DateTimePicker
      data-testid={`TimePicker__${testid}_root`}
      ampm={false}
      ampmInClock={false}
      disabled={isDisabled}
      disablePast
      label={<span style={{ paddingRight: '2em' }}>{label}</span>}
      showDaysOutsideCurrentMonth={true}
      timezone="system"
      thresholdToRenderTimeInASingleColumn={300}
      skipDisabled
      onChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
      value={value ? dayjs(value) : null}
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
              bgcolor: 'text.secondary',
              color: 'secondary.main',
            },
            '&.Mui-selected:focus': {
              bgcolor: 'text.secondary',
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
          size: size === 'small' ? 'small' : 'medium',
          color: 'secondary',
          InputProps: {
            sx: {
              fontSize: size === 'medium' ? '1em' : '.8em',
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
            fontSize: size === 'medium' ? '1em' : '.8em',
            color: 'text.secondary',
          },
        },
        field: {
          clearable: true,
          onClear: onClear,
        },
        layout: {
          sx: {
            [`.${digitalClockClasses.root}`]: {
              '&::-webkit-scrollbar': {
                width: '5px',
                height: '5px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgb(0,73,130)',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '20px',
                height: '50px',
                background: 'rgb(24,252,252)',
              },
            },
          },
        },
        //ToDo: Add shortcuts for quickly changing times
        // shortcuts: {
        //   items: [
        //     {
        //       label: 'Today',
        //       getValue: () => dayjs(),
        //     },
        //   ],
        // },
      }}
    />
  );
};
