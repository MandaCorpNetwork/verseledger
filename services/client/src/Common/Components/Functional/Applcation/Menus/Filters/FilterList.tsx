import { FilterGroup } from '@Common/Components/Core/Accordions/FilterGroup';
import type { FilterComponent } from '@Common/Definitions/Search/FilterComponentsMap';
import { ExpandMore } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary, useTheme } from '@mui/material';
import React from 'react';

import { ContractTypeFilter } from './FilterComponents/ContractType';

type FilterListProps = {
  filterList: FilterComponent[];
};

/**
 * @description Dynamic Filter List Component for Rendering Filter Component DropDowns
 * Accordion Collapse Animation Setting disabled in Low & None Animation Modes
 * ___
 * TODO:
 * - Add Clear Filters in AccordionActions
 * - Style the Expand Button & Text
 * - Add Remaining Filter Components from {@link FilterComponentsMap}
 */
export const FilterList: React.FC<FilterListProps> = ({ filterList }) => {
  //Hooks
  const theme = useTheme();

  /** Switches the Local Component State if Animations setting too low */
  const disableTransition =
    theme.animations === 'low' || theme.animations === 'none' ? true : undefined;

  /** Fetches the Filter Component for Dropdown */
  const getComponent = React.useCallback((key: SearchFilter) => {
    switch (key) {
      case 'ContractType':
        return <ContractTypeFilter />;
      case 'ContractLocations':
      case 'ContractPay':
      case 'ContractSchedule':
      case 'ContractRating':
      case 'ContractStatus':
      default:
        return;
    }
  }, []);

  const renderFilters = React.useCallback(() => {
    return filterList.map((filter) => {
      const FilterComponent = getComponent(filter.key);
      return (
        <FilterGroup
          key={filter.key}
          disabled={filter.disabled}
          expanded={disableTransition}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>{filter.label}</AccordionSummary>
          <AccordionDetails>{FilterComponent}</AccordionDetails>
        </FilterGroup>
      );
    });
  }, [disableTransition, filterList, getComponent]);
  return <>{renderFilters()}</>;
};
