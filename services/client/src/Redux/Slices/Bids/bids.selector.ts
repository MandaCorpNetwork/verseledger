import type { RootState } from '@Redux/store';

export const selectBidPagination = (state: RootState) => ({
  total: state.bids.pagination.total,
  pages: state.bids.pagination.pages,
});
