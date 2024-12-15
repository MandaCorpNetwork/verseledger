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
          Bid Dates
        </Typography>
        <Box
          aria-labelledby="ContractScheduling_BidDatesGroup"
          data-testid={`${testid}-ContractSchedule-BidDate__FilterGroup_Wrapper`}
          sx={{
            display: 'flex',
            width: 'grow',
            justifyContent: 'space-evenly',
            gap: '1em',
            py: '0.5em',
            ...layout.filterGroupWrapper,
          }}
        >
          <TimePicker
            aria-label="Bidding Ending Before Date Filter"
            data-testid={`${testid}-ContractSchedule-BidDate__BidBefore_Filter`}
            label="Bid Ends Before"
            value={filterUtils.dateFilterValues(QueryNames.BidBefore)}
            onChange={(date) => handleTimeFilterChange(QueryNames.BidBefore, date)}
            onClear={() => clearDateFilter(QueryNames.BidBefore)}
          />
          <TimePicker
            aria-label="Bidding Ending After Date Filter"
            data-testid={`${testid}-ContractSchedule-BidDate__BidAfter_Filter`}
            label="Bid Ends After"
            value={filterUtils.dateFilterValues(QueryNames.BidAfter)}
            onChange={(date) => handleTimeFilterChange(QueryNames.BidAfter, date)}
            onClear={() => clearDateFilter(QueryNames.BidAfter)}
          />
        </Box>
      </ComponentDisplay>
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
          Start Dates
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
          End Dates
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
