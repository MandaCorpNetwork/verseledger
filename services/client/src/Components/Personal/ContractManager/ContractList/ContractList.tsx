import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Box, Pagination, Typography } from '@mui/material';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { ContractListDropdown } from './ContractListDropdown';
import { ContractManagerCard } from './ContractManagerCard';

type ContractListProps = {
  /** @prop {IContract[]} - The list of Contract Objects that will render */
  contracts: IContract[];
  /** @prop {string | null} - Passes the Contract Id that is selected */
  selectedId: string | null;
  /** @prop {(id: string | null) => void} - function that sets the selected contract by passing the Id */
  setSelectedId: (id: string | null) => void;
  /** @prop {number} - The current page selected */
  page: number;
  /** @prop {(event, number) => void} - Changes the currently set page by passing a new number upon a ChangeEvent */
  setPage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  /** @prop {number} - the total number of pages available to be set to */
  pageCount: number;
  /** @prop {string | null} - Which dropdown is expanded */
  expandedList: string | null;
  /** @prop {(string) => void} - Sets the expanded list to a new string value */
  setExpandedList: (value: string) => void;
};

/**
 * ### Contract List
 * @description
 * Displays a List of Contracts found by the Contract Manager App
 * @version 0.1.6 - Sept 2024
 * @memberof {@link ContractManagerApp}
 * #### Functional Components:
 * - {@link ContractListDropdown}
 * - {@link ContractManagerCard}
 * @author ThreeCrown - May 2024
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

  /** Retrieve the Contract Archetype Options object */
  const archetypes = contractArchetypes('inherit', 'inherit');

  /**
   * Handles the logic for rendering Contract Cards
   * @param {string}archetype - Passes in an archetype Option for sorting the contracts by Archetypes with dropdowns.
   * @returns {number} - Returns the number of contracts being rendered based on the filter to use with the dropdown
   * @returns {Element[]} - Returns a collection of {@link ContractManagerCard}
   */
  const renderContractCards = React.useCallback(
    (archetype: string) => {
      const selectedArchetype = archetypes.find((a) => a.archetype === archetype);
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
