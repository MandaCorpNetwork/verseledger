import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { TimePicker } from '@Common/Components/Functional/Applcation/Menus/DateAndTime/TimePicker';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { Box, Typography } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
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
 */
export const ContractScheduleFilter: React.FC<ContractScheduleFilterProps> = ({
  'data-testid': testid = 'FilterMenu',
}) => {
  const themeExtend = useDynamicTheme();
  const { setFilters } = useURLQuery();
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
    return {
      filterListContainer,
      filterGroupContainer,
      filterGroupLabel,
      filterGroupWrapper,
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
              width: 'grow',
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
            width: 'grow',
            justifyContent: 'space-evenly',
            ...layout.filterGroupWrapper,
          }}
        ></Box>
      </ComponentDisplay>
    </Box>
  );
};
