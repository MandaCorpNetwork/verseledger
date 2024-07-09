import { createSelector } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { ArchetypeToSubtypes, QueryNames } from '@Utils/QueryNames';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import type { RootState } from '../../../store';

export const selectContracts = (state: RootState) => {
  return state.contracts;
};
export const selectContractsArray = createSelector([selectContracts], (contracts) => {
  return Object.values(contracts);
});

export const selectContract = createSelector(
  [selectContracts, (_, id: string) => id],
  (contract, id: string) => {
    return contract[id];
  },
);

export const selectBids = createSelector([selectContract], (contract) => {
  return contract.Bids;
});

export const selectActiveContractors = createSelector([selectBids], (bids) => {
  if (bids == null) return [];
  const activeContractors = bids
    .filter((b) => b.status === 'ACCEPTED' && b.User != null)
    .map((b) => b.User!);
  return activeContractors;
});

export const selectFilteredContracts = createSelector(
  [selectContractsArray, (_, filters: URLSearchParams) => filters],
  (contracts, filters) => {
    const contractsArray = Object.values(contracts);
    let filteredContracts: IContract[] = [];

    Logger.info(`Initializing Contract List...`);
    Logger.info(`Filters to be applied: ${filters}`);

    if (filters.toString() === '') {
      Logger.info(`Rendering all contracts`);
      return contractsArray;
    }

    const subtypeFilters = filters.getAll(QueryNames.Subtype);
    const archetypeFilters = filters.getAll(QueryNames.Archetype);
    const contractManagerTab = filters.get(QueryNames.ContractManagerTab);
    // const statusFilters = filters.getAll(QueryNames.Status);
    // const bidStatusFilters = filters.getAll(QueryNames.BidStatus);

    if (contractManagerTab) {
      Logger.info(`Rendering Contracts by Contract Manager Tab: ${contractManagerTab}`);
      if (contractManagerTab === 'employed') {
        filteredContracts = filteredContracts.concat(
          contractsArray.filter((contract) =>
            contract.Bids?.some((bid) => bid.status === 'ACCEPTED'),
          ),
        );
      }
      if (contractManagerTab === 'owned') {
        // filteredContracts = filteredContracts.concat(
        //   contractsArray.filter((contract) => contract.ContractOwner == null),
        // );
      }
      if (contractManagerTab === 'pending') {
        // filteredContracts = filteredContracts.concat(
        //   contractsArray.filter((contract) =>
        //     contract.Bids?.some((bid) => bid.status === 'PENDING'),
        //   ),
        // );
      }
      if (contractManagerTab === 'offers') {
        // filteredContracts = filteredContracts.concat(
        //   contractsArray.filter((contract) =>
        //     contract.Bids?.some((bid) => bid.status === 'INVITED'),
        //   ),
        // );
      }
      if (contractManagerTab === 'closed') {
        // filteredContracts = filteredContracts.concat(
        //   contractsArray.filter((contract) =>
        //     contract.Bids?.some((bid) => bid.status === 'COMPLETED'),
        //   ),
        // );
      }
    }

    if (subtypeFilters.length > 0) {
      Logger.info(`Rendering Contracts by Subtype: ${subtypeFilters}`);
      filteredContracts = filteredContracts.concat(
        contractsArray.filter((contract) => subtypeFilters.includes(contract.subtype)),
      );
    }
    if (archetypeFilters.length > 0) {
      Logger.info(`Rendering Contracts by Archetype: ${archetypeFilters}`);
      const selectedArchToSub = archetypeFilters.flatMap((archetype) => {
        return ArchetypeToSubtypes[archetype] ?? [];
      });
      const combinedSubtypes = Array.from(
        new Set([...subtypeFilters, ...selectedArchToSub]),
      );
      filteredContracts = contractsArray.filter((contract) =>
        combinedSubtypes.includes(contract.subtype),
      );
    }

    filteredContracts = [...new Set(filteredContracts)];
    return filteredContracts;
  },
);
