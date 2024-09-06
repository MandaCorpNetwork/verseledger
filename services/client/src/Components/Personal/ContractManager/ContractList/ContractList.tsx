import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Box, Pagination, Typography } from '@mui/material';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { ContractListDropdown } from './ContractListDropdown';
import { ContractManagerCard } from './ContractManagerCard';

type ContractListProps = {
  contracts: IContract[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  page: number;
  setPage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  pageCount: number;
  expandedList: string;
  setExpandedList: (value: string) => void;
};

export const ContractList: React.FC<ContractListProps> = ({
  contracts,
  selectedId,
  setSelectedId,
  page,
  setPage,
  pageCount,
  expandedList,
  setExpandedList,
}) => {
  const archetypes = contractArchetypes('inherit', 'inherit');

  const renderContractCards = React.useCallback(
    (archetype: string) => {
      const selectedArchetype = archetypes.find((a) => a.archetype === archetype);
      if (!selectedArchetype) {
        Logger.warn(`Archetype ${archetype} is not an option.`);
        return {
          count: 0,
          content: <Typography>No Contracts To Display</Typography>,
        };
      }
      const subtypeFilter = selectedArchetype.subTypes.map((sub) => sub.value);
      const filteredContracts = contracts.filter((contract) =>
        subtypeFilter.includes(contract.subtype),
      );
      const content = filteredContracts
        .sort(
          (a, b) => subtypeFilter.indexOf(a.subtype) - subtypeFilter.indexOf(b.subtype),
        )
        .map((contract) => (
          <ContractManagerCard
            contract={contract}
            key={contract.id}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
          />
        ));
      return {
        count: filteredContracts.length,
        content:
          filteredContracts.length === 0 ? (
            <Typography>No Contracts To Display</Typography>
          ) : (
            content
          ),
      };
    },
    [contracts, archetypes, selectedId, setSelectedId],
  );
  return (
    <Box
      data-testid="ContractManager__ContractListWrapper"
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
          return (
            <ContractListDropdown
              key={archetype}
              archetype={archetype}
              isExpanded={expandedList === archetype}
              onExpand={() => setExpandedList(archetype)}
              count={count}
            >
              {content}
            </ContractListDropdown>
          );
        })}
      </Box>
      <Box
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
          onChange={setPage}
          count={pageCount}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </Box>
  );
};
