import { useSoundEffect } from '@Audio/AudioManager';
import { ArchetypeListButton } from '@Common/Components/Functional/Contracts/ArchetypeListButton';
import { ContractListButton } from '@Common/Components/Functional/Contracts/ContractListButton';
import { IContractArchetype } from '@Common/Definitions/Contracts/ContractTypes';
import { Collapse, List } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContracts } from '@Redux/Slices/Contracts/contracts.selectors';
import { groupContractsByArchetype } from '@Utils/Contracts/ContractTypeUtils';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

/**
 * Virtualized List of Contract Cards for the Contract Manager
 */
export const CardView: React.FC = () => {
  const sound = useSoundEffect();
  const contracts = useAppSelector(selectContracts);

  const [openLists, setOpenLists] = useState<Set<IContractArchetype>>(new Set());

  const groupedContracts = useMemo(
    () => groupContractsByArchetype(contracts),
    [contracts],
  );

  const toggleCollapse = useCallback(
    (archetype: IContractArchetype) => {
      sound.playSound('clickMain');
      setOpenLists((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(archetype)) {
          newSet.delete(archetype);
        } else {
          newSet.add(archetype);
        }
        return newSet;
      });
    },
    [sound],
  );

  return (
    <List
      data-testid="ContractManager-Browser-ContractList__CardView_List"
      aria-label="Card Display List of Contracts"
      sx={{
        width: '100%',
      }}
    >
      {Object.keys(groupedContracts).map((archetypeKey) => {
        const archetype = groupedContracts[archetypeKey].archetype;
        const open = openLists.has(archetype.archetype);
        const archetypeContracts = groupedContracts[archetypeKey].contracts;
        return (
          <>
            <ArchetypeListButton
              key={archetype.archetype}
              archetype={archetype}
              onClick={() => toggleCollapse(archetype.archetype)}
              open={open}
              data-testid={`ContractManager-Browser-ContractList-CardView__${archetype.archetypeLabel}_DropdownButton`}
              aria-label={`Button to Expand List of Contracts with a ${archetype.archetypeLabel} Archetype`}
              count={archetypeContracts.length}
            />
            <Collapse in={open} unmountOnExit mountOnEnter>
              <List>
                {archetypeContracts.map((contract) => (
                  <ContractListButton key={contract.id} contract={contract} />
                ))}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
};
