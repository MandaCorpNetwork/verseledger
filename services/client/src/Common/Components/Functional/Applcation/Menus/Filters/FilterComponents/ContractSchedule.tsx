// import { useSoundEffect } from '@Audio/AudioManager';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { Box, Typography } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
// import { useURLQuery } from '@Utils/Hooks/useURLQuery';
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
  // const { searchParams, setFilters } = useURLQuery();
  // const sound = useSoundEffect();

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
          ...layout.filterGroupContainer,
        }}
      >
        <Typography variant="subtitle2">Bid Dates</Typography>
      </ComponentDisplay>
      <ComponentDisplay
        aria-label="Bid Date Filters"
        id="ContractScheduling__BidDatesGroup"
        data-testid={`${testid}-ContractSchedule__BidDate_Container`}
        sx={{
          ...layout.filterGroupContainer,
        }}
      >
        <Typography variant="subtitle2">Start Dates</Typography>
      </ComponentDisplay>
      <ComponentDisplay
        aria-label="Bid Date Filters"
        id="ContractScheduling__BidDatesGroup"
        data-testid={`${testid}-ContractSchedule__BidDate_Container`}
        sx={{
          ...layout.filterGroupContainer,
        }}
      >
        <Typography variant="subtitle2">End Dates</Typography>
      </ComponentDisplay>
      <ComponentDisplay
        aria-label="Bid Date Filters"
        id="ContractScheduling__BidDatesGroup"
        data-testid={`${testid}-ContractSchedule__BidDate_Container`}
        sx={{
          ...layout.filterGroupContainer,
        }}
      >
        <Typography variant="subtitle2">Duration</Typography>
      </ComponentDisplay>
    </Box>
  );
};
