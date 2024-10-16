import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Box, Pagination, Typography } from '@mui/material';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { ContractListDropdown } from './ContractListDropdown';
import { ContractManagerCard } from './ContractManagerCard';

type ContractListProps = {
  /** The list of Contract Objects that will render */
  contracts: IContract[];
  /** Passes the Contract Id that is selected */
  selectedId: string | null;
  /** function that sets the selected contract by passing the Id */
  setSelectedId: (id: string | null) => void;
  /** The current page selected */
  page: number;
  /** Changes the currently set page by passing a new number upon a ChangeEvent */
  setPage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  /** the total number of pages available to be set to */
  pageCount: number;
  /** Which dropdown is expanded */
  expandedList: string | null;
  /** Sets the expanded list to a new string value */
  setExpandedList: (value: string) => void;
};

/**
 * ### Contract List
 * @description
 * Displays a List of Contracts found by the Contract Manager App
 */
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
  // LOGIC

  /**
   * Handles the logic for rendering Contract Cards
   * - Passes in an archetype Option for sorting the contracts by Archetypes with dropdowns.
   */
  const renderContractCards = React.useCallback(
    (archetype: string) => {
      const selectedArchetype = contractArchetypes.find((a) => a.archetype === archetype);
      if (!selectedArchetype) {
        Logger.warn(`Archetype ${archetype} is not an option.`);
        return {
          count: 0,
          content: <Typography align="center">No Contracts To Display</Typography>,
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
            <Typography
              sx={{
                ml: '2em',
                color: 'grey',
                textShadow: '0 2px 5px rgba(0,0,0), 0 0 8px rgba(255,141,15,.5)',
              }}
            >
              No Contracts To Display
            </Typography>
          ) : (
            content
          ),
      };
    },
    [contracts, selectedId, setSelectedId],
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
          return count > 0 ? (
            <ContractListDropdown
              key={archetype}
              archetype={archetype}
              isExpanded={expandedList === archetype}
              onExpand={() => setExpandedList(archetype)}
              count={count}
            >
              {content}
            </ContractListDropdown>
          ) : null;
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
