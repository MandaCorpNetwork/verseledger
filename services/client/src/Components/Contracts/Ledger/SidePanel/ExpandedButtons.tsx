import { archetypeLoopButtons } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Button, Grow } from '@mui/material';

import { ContractLedgerLoopButton } from './ContractLedgerLoopButton';

type CollapsedButtonsProps = {
  isExpanded: boolean;
  setFilter: (value: ContractArchetype) => void;
  currentFilters: ContractArchetype[];
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
            onClick={() => setFilter(button.value as ContractArchetype)}
            selected={currentFilters.includes(button.value as ContractArchetype)}
          />
        ))}
      </div>
    </Grow>
  );
};
