import { FilterGroup } from '@Common/Components/Core/Accordions/FilterGroup';
import { FilterComponent } from '@Common/Definitions/Search/FilterComponentsMap';
import { ExpandMore } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';

import { ContractTypeFilter } from './FilterComponents/ContractType';

type FilterListProps = {
  filterList: FilterComponent[];
};

//TODO: Add Clear Filters in AccordionActions
export const FilterList: React.FC<FilterListProps> = ({ filterList }) => {
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
        <FilterGroup key={filter.key}>
          <AccordionSummary expandIcon={<ExpandMore />}>{filter.label}</AccordionSummary>
          <AccordionDetails>{FilterComponent}</AccordionDetails>
        </FilterGroup>
      );
    });
  }, [filterList, getComponent]);
  return <>{renderFilters()}</>;
};
