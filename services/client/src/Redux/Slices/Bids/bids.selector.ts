import type { RootState } from '@Redux/store';

//TODO: Find Bid Selectors

export const selectBidPagination = (state: RootState) => ({
  total: state.bids.pagination.total,
  pages: state.bids.pagination.pages,
});
