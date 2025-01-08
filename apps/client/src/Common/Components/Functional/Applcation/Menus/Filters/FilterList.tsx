import { FilterGroup } from '@Common/Components/Core/Accordions/FilterGroup';
import type { FilterComponent } from '@Common/Definitions/Search/FilterComponentsMap';
import type { SearchFilter } from '@Common/Definitions/Search/Filters';
import { ExpandMore } from '@mui/icons-material';
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  useTheme,
} from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import React from 'react';

import { ContractPayFilter } from './FilterComponents/ContractPay';
import { ContractScheduleFilter } from './FilterComponents/ContractSchedule';
import { ContractTypeFilter } from './FilterComponents/ContractType';

type FilterListProps = {
  filterList: FilterComponent[];
};

/**
 * @description Dynamic Filter List Component for Rendering Filter Component DropDowns
 * Accordion Collapse Animation Setting disabled in Low & None Animation Modes
 * ___
 * TODO:
 * - Add Disabled Feature to Clear Filters Button
 * - Style the Expand Button & Text
 * - Add Rating Stats Filter
 * - Add Contract Locations Filter
 * - Add Labeling
 */
export const FilterList: React.FC<FilterListProps> = ({ filterList }) => {
  //Hooks
  const theme = useTheme();
  const extendTheme = useDynamicTheme();
  const filterUtils = useFilterUtils();

  /** Switches the Local Component State if Animations setting too low */
  const disableTransition =
    theme.animations === 'low' || theme.animations === 'none' ? true : undefined;

  /** Get Theme Extensions */
  const layout = React.useMemo(() => {
    const cancelButton = extendTheme.layout('FilterGroup.CancelButton');
    return { cancelButton };
  }, [extendTheme]);

  /** Fetches the Filter Component for Dropdown */
  const getComponent = React.useCallback((key: SearchFilter) => {
    switch (key) {
      case 'ContractType':
        return <ContractTypeFilter />;
      case 'ContractLocations':
      case 'ContractPay':
        return <ContractPayFilter />;
      case 'ContractSchedule':
        return <ContractScheduleFilter />;
      // case 'ContractRating':
      // case 'ContractStatus':
      default:
        return;
    }
  }, []);

  const renderFilters = React.useCallback(() => {
    return filterList.map((filter) => {
      const FilterComponent = getComponent(filter.key);
      const filterCount = filterUtils.dynamicFilterCount(filter.filters);
      return (
        <FilterGroup
          key={filter.key}
          disabled={filter.disabled}
          expanded={disableTransition}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Badge
              badgeContent={filterCount}
              overlap="rectangular"
              color="error"
              slotProps={{
                badge: {
                  style: {
                    left: '90%',
                  },
                },
              }}
            >
              {filter.label}
            </Badge>
          </AccordionSummary>
          <AccordionDetails>{FilterComponent}</AccordionDetails>
          <AccordionActions>
            <Button
              aria-label={`Clear ${filter.label} Filters`}
              color="warning"
              onClick={() => filterUtils.clearFilters(filter.filters)}
              sx={{
                ...layout.cancelButton,
              }}
            >
              Clear Filters
            </Button>
          </AccordionActions>
        </FilterGroup>
      );
    });
  }, [disableTransition, filterList, filterUtils, getComponent, layout.cancelButton]);
  return <>{renderFilters()}</>;
};
