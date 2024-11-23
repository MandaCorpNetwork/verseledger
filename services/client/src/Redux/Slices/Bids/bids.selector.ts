import type { RootState } from '@Redux/store';
import { bidsAdapter } from './bids.adapters';

//TODO: Find Bid Selectors

const contractBidSelectors = bidsAdapter.getSelectors(
  (state: RootState) => state.bids.bids,
);

export const selectContractBids = (state: RootState, contractId: string) => {
  return contractBidSelectors
    .selectAll(state)
    .filter((bid) => bid.contract_id === contractId);
};

export const selectBidPagination = (state: RootState) => ({
  total: state.bids.pagination.total,
  pages: state.bids.pagination.pages,
});

//export const selectBidsByContractId = (state: RootState, contractId: string) => {
//   return bidsSelectors.selectAll(state).filter(bid => bid.contract_id === contractId);
// };
