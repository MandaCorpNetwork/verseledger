import type { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';

import { bidsAdapter } from './bids.adapters';

const contractBidSelectors = bidsAdapter.getSelectors(
  (state: RootState) => state.bids.bids,
);

export const selectContractBids = (state: RootState, contractId: string) => {
  return contractBidSelectors
    .selectAll(state)
    .filter((bid) => bid.contract_id === contractId);
};

export const selectActiveContractors = createSelector([selectContractBids], (bids) => {
  if (bids == null) return [];
  const activeContractors = bids
    .filter((b) => b.status === 'ACCEPTED' && b.User != null)
    .map((b) => b.User!);
  return activeContractors;
});

//TODO: Find Bid Selectors

export const selectBidPagination = (state: RootState) => ({
  total: state.bids.pagination.total,
  pages: state.bids.pagination.pages,
});
