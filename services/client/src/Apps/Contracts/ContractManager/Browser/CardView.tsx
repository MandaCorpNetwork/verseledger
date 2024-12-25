import { useSoundEffect } from '@Audio/AudioManager';
import { ArchetypeListButton } from '@Common/Components/Functional/Contracts/ArchetypeListButton';
import { IContractArchetype } from '@Common/Definitions/Contracts/ContractTypes';
import { Collapse, List, useTheme } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContracts } from '@Redux/Slices/Contracts/contracts.selectors';
import { groupContractsByArchetype } from '@Utils/Contracts/ContractTypeUtils';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

/**
 * Virtualized List of Contract Cards for the Contract Manager
 */
export const CardView: React.FC = () => {
  const theme = useTheme();
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
    <List>
      {Object.keys(groupedContracts).map((archetypeKey) => {
        const archetype = groupedContracts[archetypeKey].archetype;
        const open = openLists.has(archetype.archetype);
        // const archetypeContracts = groupedContracts[archetypeKey].contracts;
        return (
          <>
            <ArchetypeListButton
              key={archetype.archetype}
              archetype={archetype}
              onClick={() => toggleCollapse(archetype.archetype)}
            />
            <Collapse in={open} unmountOnExit mountOnEnter>
              <List>
                {groupedContracts[archetypeKey].contracts.map((contract) => (
                  <></>
                ))}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
};
