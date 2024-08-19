import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { TimePicker } from '@Common/Components/TextFields/TimePicker';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { QueryNames } from '../QueryNames';

/**
 * Component that provides a user interface for filtering by date and time.
 * It utilizes time pickers to allow users to set filters for bid dates, start dates, and end dates.
 * The selected filters are managed via URL query parameters.
 * @component
 * @example
 * return (
 *   <SchedulingDropdownFilter />
 * );
 */
export const SchedulingDropdownFilter: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useURLQuery();

  /**
   * Handles changes to the time filter values.
   * Updates the URL query parameters with the new date values.
   *
   * @param {QueryNames} filterName - The query parameter name to update.
   * @param {Date | null} date - The selected date or null if cleared.
   */
  const handleTimeFilterChange = React.useCallback(
    (filterName: QueryNames, date: Date | null) => {
      if (!date) {
        return;
      }
      setFilter(filterName, date.toISOString());
    },
    [setFilter],
  );

  /**
   * Memoized function to get the current filter value from the URL query parameters.
   *
   * @param {QueryNames} queryName - The query parameter name to retrieve.
   * @returns {Date | null} - The current filter date or null if not set.
   */
  const currentFilterValue = React.useMemo(() => {
    return (queryName: QueryNames): Date | null => {
      const dateStr = filter.get(queryName);
      return dateStr ? new Date(dateStr) : null;
    };
  }, [filter]);

  const filterNumericInput = (input: string) => {
    // Filter out non-numeric characters
    const invalidCharacters = input.match(/\D+/g);

    if (invalidCharacters) {
      enqueueSnackbar('Please only use numbers', { variant: 'error' });
    }
    return input.replace(/\D+/g, '');
  };

  const handleDurationChange = React.useCallback(
    (field: 'hours' | 'minutes', value: string) => {
      const filterValue = filterNumericInput(value);
      const totalDurationInMinutes = parseInt(
        _filter.get(QueryNames.Duration) ?? '0',
        10,
      );
      const currentHours = Math.floor(totalDurationInMinutes / 60);
      const currentMinutes = totalDurationInMinutes % 60;
      let newTotalDurationInMinutes = totalDurationInMinutes;

      if (field === 'hours') {
        const newHours = parseInt(filterValue, 10);
        newTotalDurationInMinutes = newHours * 60 + currentMinutes;
      } else {
        const newMinutes = parseInt(filterValue, 10);
        newTotalDurationInMinutes = currentHours * 60 + newMinutes;
      }

      setFilter(QueryNames.Duration, newTotalDurationInMinutes.toString());
    },
    [_filter, setFilter],
  );

  const clearDateFilter = React.useCallback(
    (filterName: QueryNames) => {
      setFilter(filterName, []);
    },
    [setFilter],
  );

  const clearDurationFilter = React.useCallback(
    (field: 'hours' | 'minutes') => {
      const totalDurationInMinutes = parseInt(
        _filter.get(QueryNames.Duration) ?? '0',
        10,
      );
      const currentHours = Math.floor(totalDurationInMinutes / 60);
      const currentMinutes = totalDurationInMinutes % 60;
      let newTotalDurationInMinutes = totalDurationInMinutes;

      if (field === 'hours') {
        newTotalDurationInMinutes -= currentHours * 60;
      } else if (field === 'minutes') {
        newTotalDurationInMinutes -= currentMinutes;
      }

      if (newTotalDurationInMinutes < 0) {
        newTotalDurationInMinutes = 0;
      }

      if (newTotalDurationInMinutes <= 0) {
        setFilter(QueryNames.Duration, []);
      } else {
        setFilter(QueryNames.Duration, newTotalDurationInMinutes.toString());
      }
    },
    [_filter, setFilter],
  );

  return (
    <Box
      data-testid="SchedulingDropdownFilter__Form_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5em',
      }}
    >
      <DigiDisplay data-testid="SchedulingDropdownFilter__BidDate_Wrapper">
        <Typography>Bid Date</Typography>
        <Box data-testid="SchedulingDropdownFilter-BidDate__FieldWrapper">
          <TimePicker
            label="Bid Ends Before"
            onChange={(date) => handleTimeFilterChange(QueryNames.BidBefore, date)}
            value={currentFilterValue(QueryNames.BidBefore)}
            onClear={() => clearDateFilter(QueryNames.BidBefore)}
          />
          <TimePicker
            label="Bid Ends After"
            onChange={(date) => handleTimeFilterChange(QueryNames.BidAfter, date)}
            value={currentFilterValue(QueryNames.BidAfter)}
            onClear={() => clearDateFilter(QueryNames.BidAfter)}
          />
        </Box>
      </DigiDisplay>
      <DigiDisplay data-testid="SchedulingDropdownFilter__StartDate_Wrapper">
        <Typography>Start Date</Typography>
        <Box data-testid="SchedulingDropdownFilter-StartDate__FieldWrapper">
          <TimePicker
            label="Starts Before"
            onChange={(date) => handleTimeFilterChange(QueryNames.StartBefore, date)}
            value={currentFilterValue(QueryNames.StartBefore)}
            onClear={() => clearDateFilter(QueryNames.StartBefore)}
          />
          <TimePicker
            label="Starts After"
            onChange={(date) => handleTimeFilterChange(QueryNames.StartAfter, date)}
            value={currentFilterValue(QueryNames.StartAfter)}
            onClear={() => clearDateFilter(QueryNames.StartAfter)}
          />
        </Box>
      </DigiDisplay>
      <DigiDisplay data-testid="SchedulingDropdownFilter__EndDate_Wrapper">
        <Typography>End Date</Typography>
        <Box data-testid="SchedulingDropdownFilter-EndDate__FieldWrapper">
          <TimePicker
            label="Ends Before"
            onChange={(date) => handleTimeFilterChange(QueryNames.EndBefore, date)}
            value={currentFilterValue(QueryNames.EndBefore)}
            onClear={() => clearDateFilter(QueryNames.EndBefore)}
          />
          <TimePicker
            label="Ends After"
            onChange={(date) => handleTimeFilterChange(QueryNames.EndAfter, date)}
            value={currentFilterValue(QueryNames.EndAfter)}
            onClear={() => clearDateFilter(QueryNames.EndAfter)}
          />
        </Box>
      </DigiDisplay>
      <DigiDisplay>
        <Typography>Duration</Typography>
        <Box data-testid="SchedulingDropdownFilter-Duration__FieldWrapper">
          <TextField
            label="Hours"
            size="small"
            color="secondary"
            value={Math.floor(parseInt(_filter.get(QueryNames.Duration) ?? '0', 10) / 60)}
            onChange={(e) => handleDurationChange('hours', e.target.value)}
            sx={{
              width: '100px',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => clearDurationFilter('hours')}
                    sx={{
                      color: 'secondary.main',
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Minutes"
            size="small"
            color="secondary"
            value={parseInt(_filter.get(QueryNames.Duration) ?? '0', 10) % 60}
            onChange={(e) => handleDurationChange('minutes', e.target.value)}
            sx={{
              width: '100px',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => clearDurationFilter('minutes')}
                    sx={{
                      color: 'secondary.main',
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DigiDisplay>
      <Box>
        <Typography variant="tip" sx={{ fontSize: '.75em', px: '.5em' }}>
          All times are in Local Time
        </Typography>
      </Box>
    </Box>
  );
};
