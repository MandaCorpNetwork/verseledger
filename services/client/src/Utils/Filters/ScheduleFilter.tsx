import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { TimePicker } from '@Common/Components/TextFields/TimePicker';
import { Box, Typography } from '@mui/material';
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
  const [_filter, setFilter] = useURLQuery();

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
      const dateStr = _filter.get(queryName);
      return dateStr ? new Date(dateStr) : null;
    };
  }, [_filter]);

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
          />
          <TimePicker
            label="Bid Ends After"
            onChange={(date) => handleTimeFilterChange(QueryNames.BidAfter, date)}
            value={currentFilterValue(QueryNames.BidAfter)}
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
          />
          <TimePicker
            label="Starts After"
            onChange={(date) => handleTimeFilterChange(QueryNames.StartAfter, date)}
            value={currentFilterValue(QueryNames.StartAfter)}
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
          />
          <TimePicker
            label="Ends After"
            onChange={(date) => handleTimeFilterChange(QueryNames.EndAfter, date)}
            value={currentFilterValue(QueryNames.EndAfter)}
          />
        </Box>
      </DigiDisplay>
      <DigiDisplay>
        <Typography>Duration</Typography>
      </DigiDisplay>
      <Typography></Typography>
    </Box>
  );
};
