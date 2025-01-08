import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { TimePicker } from '@Common/Components/Functional/Applcation/Menus/DateAndTime/TimePicker';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { Clear } from '@mui/icons-material';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { numericFieldInput } from '@Utils/numericFilter';
import { capFirstLetter } from '@Utils/StringUtil';
import React from 'react';

type ContractScheduleFilterProps = {
  ['data-testid']?: string;
};

/** Define the DatePicker Filters */
const dateFilters = [
  {
    label: 'Bid Date',
    aria: 'Bid Date Filters',
    testid: 'BidDate',
    fields: [
      {
        query: QueryNames.BidBefore,
        label: 'Bids Ends Before',
        testid: 'BidBefore',
        aria: 'Bidding Ending Before Date Filter',
      },
      {
        query: QueryNames.BidAfter,
        label: 'Bids End After',
        testid: 'BidAfter',
        aria: 'Bidding Ending After Date Filter',
      },
    ],
  },
  {
    label: 'Start Date',
    aria: 'Start Date Filters',
    testid: 'StartDate',
    fields: [
      {
        query: QueryNames.StartBefore,
        label: 'Starts Before',
        testid: 'StartBefore',
        aria: 'Contract Starts Before Date Filter',
      },
      {
        query: QueryNames.StartAfter,
        label: 'Starts After',
        testid: 'StartAfter',
        aria: 'Contract Starts After Date Filter',
      },
    ],
  },
  {
    label: 'End Date',
    aria: 'End Date Filters',
    testid: 'EndDate',
    fields: [
      {
        query: QueryNames.EndBefore,
        label: 'Ends Before',
        testid: 'EndBefore',
        aria: 'Contract Ends Before Date Filter',
      },
      {
        query: QueryNames.EndAfter,
        label: 'Ends After',
        testid: 'EndAfter',
        aria: 'Contract Ends After Date Filter',
      },
    ],
  },
];

/**
 * @description Filter Component for Contract Scheduling. Filters for Bid Dates, Start Dates & End Dates.
 * ___
 * TODO:
 * - Add Descriptions of the Fields
 */
export const ContractScheduleFilter: React.FC<ContractScheduleFilterProps> = ({
  'data-testid': testid = 'FilterMenu',
}) => {
  const themeExtend = useDynamicTheme();
  const { setFilters, searchParams } = useURLQuery();
  const filterUtils = useFilterUtils();

  const layout = React.useMemo(() => {
    const filterListContainer = themeExtend.layout(
      'ContractScheduleFilter.FilterListContainer',
    );
    const filterGroupContainer = themeExtend.layout(
      'ContractScheduleFilter.FilterGroupContainer',
    );
    const filterGroupLabel = themeExtend.layout(
      'ContractScheduleFilter.FilterGroupLabel',
    );
    const filterGroupWrapper = themeExtend.layout(
      'ContractScheduleFilter.FilterGroupWrapper',
    );
    const durationInput = themeExtend.layout('ContractScheduleFilter.DurationInput');
    return {
      filterListContainer,
      filterGroupContainer,
      filterGroupLabel,
      filterGroupWrapper,
      durationInput,
    };
  }, [themeExtend]);

  /** Set Date Filter Values */
  const handleTimeFilterChange = React.useCallback(
    (filterName: QueryNames, date: Date | null) => {
      if (!date) {
        return;
      }
      setFilters(filterName, date.toISOString());
    },
    [setFilters],
  );

  /** Clear Given Date Filter */
  const clearDateFilter = React.useCallback(
    (filterName: QueryNames) => {
      setFilters(filterName, []);
    },
    [setFilters],
  );

  /** Render the DatePicker Feilds */
  const renderDatePickers = React.useCallback(() => {
    return dateFilters.map((group) => {
      return (
        <ComponentDisplay
          key={testid}
          aria-label={group.aria}
          id={`ContractScheduling__${group.testid}Group`}
          data-testid={`${testid}-ContractSchedule__${group.testid}_Container`}
          sx={{
            p: '0.5em',
            ...layout.filterGroupContainer,
          }}
        >
          <Typography
            aria-labelledby={`ContractScheduling__${group.testid}Group`}
            data-testid={`${testid}-ContractSchedule__${group.testid}`}
            variant="subtitle2"
            sx={{
              display: 'flex',
              textAlign: 'left',
              width: '100%',
              pl: '1em',
              ...layout.filterGroupLabel,
            }}
          >
            {group.label}
          </Typography>
          <Box
            aria-labelledby={`ContractScheduling__${group.testid}Group`}
            data-testid={`${testid}-ContractSchedule-${group.testid}__FilterGroup_Wrapper`}
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-evenly',
              gap: '1em',
              py: '0.5em',
              ...layout.filterGroupWrapper,
            }}
          >
            {group.fields.map((field) => (
              <TimePicker
                key={field.testid}
                aria-label={field.aria}
                label={field.label}
                value={filterUtils.dateFilterValues(field.query)}
                onChange={(date) => handleTimeFilterChange(field.query, date)}
                onClear={() => clearDateFilter(field.query)}
              />
            ))}
          </Box>
        </ComponentDisplay>
      );
    });
  }, [
    clearDateFilter,
    filterUtils,
    handleTimeFilterChange,
    layout.filterGroupContainer,
    layout.filterGroupLabel,
    layout.filterGroupWrapper,
    testid,
  ]);

  /** Memoized Duration Fields */
  const durationValues = React.useMemo(() => {
    const total = Number.parseInt(searchParams.get(QueryNames.Duration) ?? '0', 10);
    const currentHours = Math.floor(total / 60);
    const currentMinutes = total % 60;
    return { total, currentHours, currentMinutes };
  }, [searchParams]);

  /** Handle Duration Filter Change */
  const handleDurationChange = React.useCallback(
    (field: 'hours' | 'minutes', value: string) => {
      const filterValue = numericFieldInput(value);
      const parsedValue = filterValue !== null ? filterValue.toString() : '';

      if (field === 'hours') {
        const newHours = Number.parseInt(parsedValue, 10);
        const newTotal = newHours * 60 + durationValues.currentMinutes;
        setFilters(QueryNames.Duration, newTotal.toString());
      } else {
        const newMinutes = Number.parseInt(parsedValue, 10);
        const newTotal = durationValues.currentMinutes * 60 + newMinutes;
        setFilters(QueryNames.Duration, newTotal.toString());
      }
    },
    [durationValues.currentMinutes, setFilters],
  );

  /** Handle Clearing a Duration Change */
  const clearDurationFilter = React.useCallback(
    (field: 'hours' | 'minutes') => {
      if (field === 'hours') {
        const newTotal = durationValues.currentMinutes;
        setFilters(QueryNames.Duration, newTotal.toString());
      } else {
        const newTotal = durationValues.total - durationValues.currentMinutes;
        setFilters(QueryNames.Duration, newTotal.toString());
      }
    },
    [durationValues.currentMinutes, durationValues.total, setFilters],
  );
  return (
    <Box
      aria-label="Contract Scheduling Filter List Container"
      id="FilterGroup__ContractScheduling"
      data-testid={`${testid}__ContractSchedule_GroupWrapper`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        ...layout.filterListContainer,
      }}
    >
      {renderDatePickers()}
      <ComponentDisplay
        aria-label="Bid Date Filters"
        id="ContractScheduling__BidDatesGroup"
        data-testid={`${testid}-ContractSchedule__BidDate_Container`}
        sx={{
          p: '0.5em',
          ...layout.filterGroupContainer,
        }}
      >
        <Typography
          aria-labelledby="ContractScheduling__BidDatesGroup"
          data-testid={`${testid}-ContractSchedule-BidDate__Label`}
          variant="subtitle2"
          sx={{
            display: 'flex',
            textAlign: 'left',
            width: '100%',
            pl: '1em',
            ...layout.filterGroupLabel,
          }}
        >
          Duration
        </Typography>
        <Box
          aria-labelledby="ContractScheduling_BidDatesGroup"
          data-testid={`${testid}-ContractSchedule-BidDate__FilterGroup_Wrapper`}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
            ...layout.filterGroupWrapper,
          }}
        >
          {[
            { string: 'hours', value: durationValues.currentHours },
            { string: 'minutes', value: durationValues.currentMinutes },
          ].map((time) => (
            <TextField
              key={time.string}
              label={capFirstLetter(time.string)}
              value={time.value > 0 ? time.value : null}
              onChange={(e) =>
                handleDurationChange(time.string as 'hours' | 'minutes', e.target.value)
              }
              sx={{
                width: '100px',
                ...layout.durationInput,
              }}
              slotProps={{
                input: {
                  endAdornment: time.value > 0 && (
                    <InputAdornment
                      position="end"
                      onClick={() =>
                        clearDurationFilter(time.string as 'hours' | 'minutes')
                      }
                    >
                      <Clear />
                    </InputAdornment>
                  ),
                },
              }}
            />
          ))}
        </Box>
      </ComponentDisplay>
    </Box>
  );
};
