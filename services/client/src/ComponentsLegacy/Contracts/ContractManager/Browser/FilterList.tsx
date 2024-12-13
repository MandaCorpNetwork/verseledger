import { useSoundEffect } from '@Audio/AudioManager';
import { DropdownFilter } from '@CommonLegacy/Components/App/DropdownFilter';
import { ElevatedDropdownBox } from '@CommonLegacy/Components/Collapse/ElevatedDropdownBox';
import React from 'react';

type FilterListProps = {
  /** Sets the List Collapse to Open or Close */
  isOpen: boolean;
};

export const FilterList: React.FC<FilterListProps> = ({ isOpen }) => {
  // LOCAL STATES
  // HOOKS
  const sound = useSoundEffect();
  // LOGIC
  /** Handles the clickEvent that expands a `DropdownFilter` component. */
  const handleExpand = React.useCallback(
    (panel: string) => {
      sound.playSound('clickMain');
      setExpanded((prev) => (prev === panel ? null : panel));
    },
    [sound, setExpanded],
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
