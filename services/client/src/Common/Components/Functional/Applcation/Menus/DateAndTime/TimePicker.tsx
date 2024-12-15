import { Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import dayjs from 'dayjs';
import React from 'react';

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
  ['data-testid']?: string;
  /** Optional disabled flag */
  disabled?: boolean;
};

/**
 * @description A DateTimePicker Mui Field for selecting Specific Dates & Times throughout the application
 * ___
 * TODO:
 * Add Shortcuts for Quickly Changing Times
 * */
export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  size = 'small',
  'data-testid': testid = 'field',
  disabled,
  onClear,
}) => {
  const extendTheme = useDynamicTheme();

  const layout = React.useMemo(() => {
    const datePickerButton = extendTheme.layout('TimePicker.DatePickerButton');
    const dayItem = extendTheme.layout('TimePicker.DayItem');
    const desktopPaper = extendTheme.layout('TimePicker.DesktopPaper');
    const textField = extendTheme.layout('TimePicker.TextField');
    const dialog = extendTheme.layout('TimePicker.Dialog');
    const digitalClockItem = extendTheme.layout('TimePicker.DigitalClockItem');
    const layout = extendTheme.layout('TimePicker.Layout');
    return {
      datePickerButton,
      dayItem,
      desktopPaper,
      textField,
      dialog,
      digitalClockItem,
      layout,
    };
  }, [extendTheme]);
  return (
    <DateTimePicker
      data-testid={`TimePicker__${testid}_root`}
      ampm={false}
      ampmInClock={false}
      disabled={disabled}
      disablePast
      label={<Typography>{label}</Typography>}
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
            ...layout.datePickerButton,
          },
        },
        field: {
          clearable: true,
          onClear: onClear,
        },
        day: {
          sx: {
            ...layout.dayItem,
          },
        },
        desktopPaper: {
          sx: {
            ...layout.desktopPaper,
          },
        },
        textField: {
          size: size,
          sx: {
            maxWidth: '200px',
            ...layout.textField,
          },
        },
        dialog: {
          sx: {
            ...layout.dialog,
          },
        },
        digitalClockItem: {
          sx: {
            ...layout.digitalClockItem,
          },
        },
        layout: {
          sx: {
            ...layout.layout,
          },
        },
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
