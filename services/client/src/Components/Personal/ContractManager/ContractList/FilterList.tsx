import { DropdownFilter } from '@Common/Components/App/DropdownFilter';
import { ElevatedDropdownBox } from '@Common/Components/Collapse/ElevatedDropdownBox';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

type FilterListProps = {
  /**
   * Sets the List Collapse to Open or Closed
   */
  isOpen: boolean;
};

/**
 * ### FilterList
 * @description
 * An {@link ElevatedDropdownBox} containing Filters for {@link ContractManagerApp}.
 * @prop {boolean} isOpen - Determines if the filter list is currently open.
 * @example
 * <FilterList isOpen={true} />
 * @returns {JSX.Element} - The rendered `FilterList` component.
 * #### Functional Components
 * @component {@link DropdownFilter}
 * #### Styled Components
 * @component {@link ElevatedDropdownBox}
 * @author ThreeCrown
 */
export const FilterList: React.FC<FilterListProps> = ({ isOpen }) => {
  // LOCAL STATES
  /**
   * State determins which Dropdown Filer is currently open.
   * @default {null}
   * @returns {string} - The current expanded filter.
   */
  const [expanded, setExpanded] = React.useState<string | null>(null);
  // HOOKS
  const { playSound } = useSoundEffect();
  // LOGIC
  /**
   * @function handleExpand - Handles the clickEvent that expands a `DropdownFilter` component.
   * @params {string} panel - The name of the filter to expand.
   * @fires
   * - `playSound('clickMain')`
   * - `setExpanded` - Sets the expanded filter.
   */
  const handleExpand = React.useCallback(
    (panel: string) => {
      playSound('clickMain');
      setExpanded((prev) => (prev === panel ? null : panel));
    },
    [playSound, setExpanded],
  );

  return (
    <ElevatedDropdownBox
      in={isOpen}
      data-testid="ContractManager-ContractList-SearchTools__FilterList_Collapse"
      sx={{ p: '1em', mt: '.5em' }}
    >
      <DropdownFilter
        filter="Subtype"
        label="Subtypes"
        isExpanded={expanded === 'Subtype'}
        onExpand={() => handleExpand('Subtype')}
      />
      <DropdownFilter
        filter="Locations"
        label="Locations"
        isExpanded={expanded === 'Locations'}
        onExpand={() => handleExpand('Locations')}
      />
      <DropdownFilter
        filter="Scheduling"
        label="Scheduling"
        isExpanded={expanded === 'Scheduling'}
        onExpand={() => handleExpand('Scheduling')}
      />
      <DropdownFilter
        filter="Pay"
        label="Compensation"
        isExpanded={expanded === 'Pay'}
        onExpand={() => handleExpand('Pay')}
      />
    </ElevatedDropdownBox>
  );
};
