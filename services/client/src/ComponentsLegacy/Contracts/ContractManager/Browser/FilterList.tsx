import { DropdownFilter } from '@CommonLegacy/Components/App/DropdownFilter';
import { ElevatedDropdownBox } from '@CommonLegacy/Components/Collapse/ElevatedDropdownBox';
import type React from 'react';

type FilterListProps = {
  /** Sets the List Collapse to Open or Close */
  isOpen: boolean;
};

export const FilterList: React.FC<FilterListProps> = ({ isOpen }) => {
  // LOCAL STATES
  // HOOKS
  // LOGIC
  /** Handles the clickEvent that expands a `DropdownFilter` component. */

  return (
    <ElevatedDropdownBox
      in={isOpen}
      data-testid="ContractManager-ContractList-SearchTools__FilterList_Collapse"
      sx={{ p: '1em', mt: '.5em' }}
    >
      <DropdownFilter
        filter="Subtype"
        label="Subtypes"
        isExpanded={false}
        onExpand={() => {}}
      />
      <DropdownFilter
        filter="Locations"
        label="Locations"
        isExpanded={false}
        onExpand={() => {}}
      />
      <DropdownFilter
        filter="Scheduling"
        label="Scheduling"
        isExpanded={false}
        onExpand={() => {}}
      />
      <DropdownFilter
        filter="Pay"
        label="Compensation"
        isExpanded={false}
        onExpand={() => {}}
      />
    </ElevatedDropdownBox>
  );
};
