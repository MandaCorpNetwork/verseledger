import { ArchetypeListButton } from '@Common/Components/Functional/Contracts/ArchetypeListButton';
import { List } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContracts } from '@Redux/Slices/Contracts/contracts.selectors';
import { groupContractsByArchetype } from '@Utils/Contracts/ContractTypeUtils';
import type React from 'react';
import { useMemo } from 'react';

/**
 * Virtualized List of Contract Cards for the Contract Manager
 */
export const CardView: React.FC = () => {
  const contracts = useAppSelector(selectContracts);

  const groupedContracts = useMemo(
    () => groupContractsByArchetype(contracts),
    [contracts],
  );
  return (
    <List>
      {Object.keys(groupedContracts).map((archetypeKey) => {
        const archetype = groupedContracts[archetypeKey].archetype;
        // const archetypeContracts = groupedContracts[archetypeKey].contracts;
        return (
          <>
            <ArchetypeListButton key={archetype.archetype} archetype={archetype} />
          </>
        );
      })}
    </List>
  );
};
