import { useSoundEffect } from '@Audio/AudioManager';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ErrorOutline } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectContracts } from '@Redux/Slices/Contracts/contracts.selectors';
import React from 'react';

import { ContractListDropdown } from './ContractListDropdown';
import { ContractManagerCard } from './ContractManagerCard';

/**
 * @deprecated
 */
export const ContractList: React.FC = () => {
  const sound = useSoundEffect();
  const [expandedArchetype, setExpandedArchetype] = React.useState<string | null>(null);

  const handleExpandArchetype = React.useCallback(
    (value: string) => {
      if (!value) return;
      sound.playSound('open');
      setExpandedArchetype(value);
    },
    [sound],
  );

  const contracts = useAppSelector(selectContracts);
  /**
   * Handles the logic for rendering Contract Cards
   * - Passes in an archetype Option for sorting the contracts by Archetypes with dropdowns.
   */
  const renderContractCards = React.useCallback(
    (archetype: string) => {
      const selectedArchetype = contractArchetypes.find((a) => a.archetype === archetype);

      if (!selectedArchetype) {
        return {
          count: 0,
          content: <ErrorOutline fontSize="large" color="error" />,
        };
      }

      const subtypeFilter = selectedArchetype.subtypes.map((sub) => sub.value);
      const filteredContracts = contracts.filter((contract) =>
        subtypeFilter.includes(contract.subtype),
      );
      const sortedContracts = filteredContracts.sort(
        (a, b) => subtypeFilter.indexOf(a.subtype) - subtypeFilter.indexOf(b.subtype),
      );

      const content = sortedContracts.map((contract) => (
        <ContractManagerCard key={contract.id} contract={contract} />
      ));

      return {
        count: filteredContracts.length,
        content:
          filteredContracts.length === 0 ? (
            <ErrorOutline fontSize="large" color="error" />
          ) : (
            content
          ),
      };
    },
    [contracts],
  );

  return (
    <Box
      data-testid="ContractManager__ContractList_Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        alignItems: 'center',
        mb: '5%',
        px: '.5em',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        data-testid="ContractManager__ContractList_Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          px: '1em',
          gap: '1em',
        }}
      >
        {[
          'Logistics',
          'Medical',
          'Security',
          'Salvage',
          'Industry',
          'RRR',
          'Fleet',
          'Exploration',
          'Proxy',
        ].map((archetype) => {
          const { count, content } = renderContractCards(archetype);
          return count > 0 ? (
            <ContractListDropdown
              key={archetype}
              archetype={archetype}
              isExpanded={expandedArchetype === archetype}
              onExpand={() => handleExpandArchetype(archetype)}
              count={count}
            >
              {content}
            </ContractListDropdown>
          ) : null;
        })}
      </Box>
    </Box>
  );
};
