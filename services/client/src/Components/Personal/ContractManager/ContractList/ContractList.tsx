import { Box, Pagination } from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
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
  const [filters] = useURLQuery();
  const currentTab = (filters.get(QueryNames.ContractManagerTab) as string) ?? 'employed';
  const renderContractCards = React.useCallback(() => {
    return contracts.map((contract) => (
      <ContractManagerCard
        contract={contract}
        key={contract.id}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
      />
    ));
  }, [contracts]);
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
      <ContractListDropdown
        isExpanded={expandedList === 'logistics'}
        onExpand={() => setExpandedList('logistics')}
        archetype="Logistics"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'medical'}
        onExpand={() => setExpandedList('medical')}
        archetype="Medical"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'security'}
        onExpand={() => setExpandedList('security')}
        archetype="Security"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'salvage'}
        onExpand={() => setExpandedList('salvage')}
        archetype="Salvage"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'industry'}
        onExpand={() => setExpandedList('industry')}
        archetype="Industry"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'rrr'}
        onExpand={() => setExpandedList('rrr')}
        archetype="RRR"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'fleet'}
        onExpand={() => setExpandedList('fleet')}
        archetype="Fleet"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'exploration'}
        onExpand={() => setExpandedList('exploration')}
        archetype="Exploration"
      ></ContractListDropdown>
      <ContractListDropdown
        isExpanded={expandedList === 'proxy'}
        onExpand={() => setExpandedList('proxy')}
        archetype="Proxy"
      ></ContractListDropdown>
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
