import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { TimePicker } from '@CommonLegacy/Components/TextFields/TimePicker';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

/**
 * Component that provides a user interface for filtering by date and time.
 * It utilizes time pickers to allow users to set filters for bid dates, start dates, and end dates.
 * The selected filters are managed via URL query parameters.
 * @deprecated -
 * !- Pending Migration on Contract Ledger
 */
export const SchedulingDropdownFilter: React.FC<unknown> = () => {
  const { searchParams, setFilters } = useURLQuery();

  /**
   * Handles changes to the time filter values.
   * Updates the URL query parameters with the new date values.
   *
   * @param filterName - The query parameter name to update.
   * @param date - The selected date or null if cleared.
   */
  const handleTimeFilterChange = React.useCallback(
    (filterName: QueryNames, date: Date | null) => {
      if (!date) {
        return;
      }
      setFilters(filterName, date.toISOString());
    },
    [setFilters],
  );

  /**
   * Memoized function to get the current filter value from the URL query parameters.
   *
   * @param queryName - The query parameter name to retrieve.
   */
  const currentFilterValue = React.useMemo(() => {
    return (queryName: QueryNames): Date | null => {
      const dateStr = searchParams.get(queryName);
      return dateStr ? new Date(dateStr) : null;
    };
  }, [searchParams]);

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
      const totalDurationInMinutes = Number.parseInt(
        searchParams.get(QueryNames.Duration) ?? '0',
        10,
      );
      const currentHours = Math.floor(totalDurationInMinutes / 60);
      const currentMinutes = totalDurationInMinutes % 60;
      let newTotalDurationInMinutes = totalDurationInMinutes;

      if (field === 'hours') {
        const newHours = Number.parseInt(filterValue, 10);
        newTotalDurationInMinutes = newHours * 60 + currentMinutes;
      } else {
        const newMinutes = Number.parseInt(filterValue, 10);
        newTotalDurationInMinutes = currentHours * 60 + newMinutes;
      }

      setFilters(QueryNames.Duration, newTotalDurationInMinutes.toString());
    },
    [searchParams, setFilters],
  );

  const clearDateFilter = React.useCallback(
    (filterName: QueryNames) => {
      setFilters(filterName, []);
    },
    [setFilters],
  );

  const clearDurationFilter = React.useCallback(
    (field: 'hours' | 'minutes') => {
      const totalDurationInMinutes = Number.parseInt(
        searchParams.get(QueryNames.Duration) ?? '0',
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
        setFilters(QueryNames.Duration, []);
      } else {
        setFilters(QueryNames.Duration, newTotalDurationInMinutes.toString());
      }
    },
    [searchParams, setFilters],
  );

  const duration = Number.parseInt(searchParams.get(QueryNames.Duration) ?? '0', 10);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <Box
      data-testid="SchedulingDropdownFilter__Form_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5em',
      }}
    >
      <ComponentDisplay
        data-testid="SchedulingDropdownFilter__BidDate_Wrapper"
        sx={{
          p: '.5em',
        }}
      >
        <Typography
          data-testid="SchedulingDropdownFilter__BidDate_Title"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            textShadow: '0 0 2px rgba(14,255,255,.3)',
          }}
        >
          Bid Date
        </Typography>
        <Box
          data-testid="SchedulingDropdownFilter-BidDate__FieldWrapper"
          sx={{
            display: 'flex',
            gap: '.5em',
          }}
        >
          <TimePicker
            data-testid="SchedulingDropdownFilter-BidDate__BidBefore_Field"
            label="Bid Ends Before"
            onChange={(date) => handleTimeFilterChange(QueryNames.BidBefore, date)}
            value={currentFilterValue(QueryNames.BidBefore)}
            onClear={() => clearDateFilter(QueryNames.BidBefore)}
          />
          <TimePicker
            data-testid="SchedulingDropdownFilter-BidDate__BidAfter_Field"
            label="Bid Ends After"
            onChange={(date) => handleTimeFilterChange(QueryNames.BidAfter, date)}
            value={currentFilterValue(QueryNames.BidAfter)}
            onClear={() => clearDateFilter(QueryNames.BidAfter)}
          />
        </Box>
      </ComponentDisplay>
      <ComponentDisplay
        data-testid="SchedulingDropdownFilter__StartDate_Wrapper"
        sx={{ p: '.5em' }}
      >
        <Typography
          data-testid="SchedulingDropdownFilter__StartDate_Title"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            textShadow: '0 0 2px rgba(14,255,255,.3)',
          }}
        >
          Start Date
        </Typography>
        <Box
          data-testid="SchedulingDropdownFilter-StartDate__FieldWrapper"
          sx={{ display: 'flex', gap: '.5em' }}
        >
          <TimePicker
            data-testid="SchedulingDropdownFilter-StartDate__StartBefore_Field"
            label="Starts Before"
            onChange={(date) => handleTimeFilterChange(QueryNames.StartBefore, date)}
            value={currentFilterValue(QueryNames.StartBefore)}
            onClear={() => clearDateFilter(QueryNames.StartBefore)}
          />
          <TimePicker
            data-testid="SchedulingDropdownFilter-StartDate__StartAfter_Field"
            label="Starts After"
            onChange={(date) => handleTimeFilterChange(QueryNames.StartAfter, date)}
            value={currentFilterValue(QueryNames.StartAfter)}
            onClear={() => clearDateFilter(QueryNames.StartAfter)}
          />
        </Box>
      </ComponentDisplay>
      <ComponentDisplay
        data-testid="SchedulingDropdownFilter__EndDate_Wrapper"
        sx={{ p: '.5em' }}
      >
        <Typography
          data-testid="SchedulingDropdownFilter-EndDate__"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            textShadow: '0 0 2px rgba(14,255,255,.3)',
          }}
        >
          End Date
        </Typography>
        <Box
          data-testid="SchedulingDropdownFilter-EndDate__FieldWrapper"
          sx={{ display: 'flex', gap: '.5em' }}
        >
          <TimePicker
            data-testid="SchedulingDropdownFilter-EndDate__EndBefore_Field"
            label="Ends Before"
            onChange={(date) => handleTimeFilterChange(QueryNames.EndBefore, date)}
            value={currentFilterValue(QueryNames.EndBefore)}
            onClear={() => clearDateFilter(QueryNames.EndBefore)}
          />
          <TimePicker
            data-testid="SchedulingDropdownFilter-EndDate__EndAfter_Field"
            label="Ends After"
            onChange={(date) => handleTimeFilterChange(QueryNames.EndAfter, date)}
            value={currentFilterValue(QueryNames.EndAfter)}
            onClear={() => clearDateFilter(QueryNames.EndAfter)}
          />
        </Box>
      </ComponentDisplay>
      <ComponentDisplay
        data-testid="SchedulingDropdownFilter__Duration_Wrapper"
        sx={{ px: '.5em', pb: '.5em' }}
      >
        <Typography
          data-testid="SchedulingDropdownFilter-Duration__Title"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            textShadow: '0 0 2px rgba(14,255,255,.3)',
            mb: '.2em',
          }}
        >
          Duration
        </Typography>
        <Box
          data-testid="SchedulingDropdownFilter-Duration__FieldWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '80%',
          }}
        >
          <TextField
            label="Hours"
            size="small"
            color="secondary"
            value={hours > 0 ? hours : ''}
            onChange={(e) => handleDurationChange('hours', e.target.value)}
            sx={{
              width: '100px',
            }}
            InputProps={{
              endAdornment: hours > 0 && (
                <InputAdornment position="end" sx={{ mr: '-8px', ml: '-4px' }}>
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
            value={minutes > 0 ? minutes : ''}
            onChange={(e) => handleDurationChange('minutes', e.target.value)}
            sx={{
              width: '100px',
            }}
            InputProps={{
              endAdornment: minutes > 0 && (
                <InputAdornment position="end" sx={{ mr: '-8px', ml: '-4px' }}>
                  <IconButton
                    onClick={() => clearDurationFilter('minutes')}
                    size="small"
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
        <Typography variant="tip" sx={{ px: '1em', mt: '.5em' }}>
          Max Duration on Contract
        </Typography>
      </ComponentDisplay>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          mt: '.5em',
        }}
      >
        <Typography variant="tip" sx={{ fontSize: '.75em', px: '1em' }}>
          All times are in Local Time
        </Typography>
      </Box>
    </Box>
  );
};
