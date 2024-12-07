import { useSoundEffect } from '@Audio/AudioManager';
import { contractArchetypes } from '@CommonLegacy/DefinitionsLegacy/Structures/Contracts/ContractArchetypes';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Pagination } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectBidPagination } from '@Redux/Slices/Bids/bids.selector';
import {
  selectContractPagination,
  selectContracts,
} from '@Redux/Slices/Contracts/contracts.selectors';
import React from 'react';

import { ContractListDropdown } from './ContractListDropdown';
import { ContractManagerCard } from './ContractManagerCard';

type ContractListProps = {
  currentTab: string;
};

export const ContractList: React.FC<ContractListProps> = ({ currentTab }) => {
  const [expandedArchetype, setExpandedArchetype] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const sound = useSoundEffect();

  const handleExpandArchetype = React.useCallback(
    (value: string) => {
      if (!value) return;
      sound.playSound('open');
      setExpandedArchetype(value);
    },
    [setExpandedArchetype, sound],
  );

  const handleChangePage = React.useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      sound.playSound('clickMain');
      setPage(newPage);
    },
    [sound, setPage],
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

      const subtypeFilter = selectedArchetype.subTypes.map((sub) => sub.value);
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

  const bidCount = useAppSelector(selectBidPagination);

  const contractCount = useAppSelector(selectContractPagination);

  const pageCount =
    currentTab === 'employed' ||
    currentTab === 'pending' ||
    currentTab === 'offers' ||
    currentTab === 'completed'
      ? bidCount.pages
      : contractCount.pages;
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
        '&::-webkit-scrollbar': {
          width: '5px',
          height: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgb(0,73,130)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          background: 'rgb(24,252,252)',
        },
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
      <Box
        data-testid="ContractManager-ContractList__Pagination_Wrapper"
        sx={{
          position: 'sticky',
          bottom: '0',
          p: '.2em',
          display: pageCount > 1 ? 'flex' : 'none',
          borderRadius: '5px',
          borderLeft: '2px solid',
          borderRight: '2px solid',
          borderColor: 'secondary.main',
          boxShadow: '0 0px 10px 5px rgba(24,252,252,0.25)',
          backgroundImage:
            'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
        }}
      >
        <Pagination
          page={page}
          onChange={handleChangePage}
          count={pageCount}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </Box>
  );
};
