import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';

export const selectContracts = (state: RootState) => {
  return state.contracts.contracts;
};
export const selectContractsArray = createSelector([selectContracts], (contracts) => {
  return Object.values(contracts.contracts);
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
