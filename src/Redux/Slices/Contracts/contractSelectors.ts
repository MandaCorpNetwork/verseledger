import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export const selectContracts = (state: RootState) => {
  return state.contracts;
};
export const selectContractsArray = createSelector([selectContracts], (contracts) => {
  return Object.values(contracts);
});

export const pickContract = createSelector(
  [selectContracts, (_, id: number) => id],
  (contracts, id: number) => {
    return contracts[id];
  },
);
