import { archetypeLoopButtons } from '@Common/Definitions/Contracts/ContractArchetypes';
import type { IContractArchetype } from '@Common/Definitions/Contracts/ContractTypes';
import { Button, Grow } from '@mui/material';
import type React from 'react';

import { ContractLedgerLoopButton } from './ContractLedgerLoopButton';

type CollapsedButtonsProps = {
  isExpanded: boolean;
  setFilter: (value: IContractArchetype) => void;
  currentFilters: IContractArchetype[];
  openCreate: () => void;
};
export const ExpandedButtons: React.FC<CollapsedButtonsProps> = ({
  isExpanded,
  setFilter,
  currentFilters,
  openCreate,
}) => {
  return (
    <Grow
      data-testid="ContractLedger-ColumnOne__ArchetypeButton_Grow"
      in={isExpanded}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 3500, exit: 300 }}
    >
      <div>
        <Button
          onClick={openCreate}
          data-testid="CreateContract"
          size="small"
          color="secondary"
          variant="contained"
          sx={{ fontSize: '.7em', fontWeight: 'bold', mr: '.5em' }}
        >
          Create Contract
        </Button>
        {archetypeLoopButtons.map((button) => (
          <ContractLedgerLoopButton
            key={button.value}
            title={button.title}
            videoSource={button.videoSource}
            onClick={() => setFilter(button.value as IContractArchetype)}
            selected={currentFilters.includes(button.value as IContractArchetype)}
          />
        ))}
      </div>
    </Grow>
  );
};
