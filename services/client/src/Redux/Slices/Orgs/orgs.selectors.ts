import { RootState } from '@Redux/store';

import { orgsAdapter } from './orgs.adapters';

const orgsSelectors = orgsAdapter.getSelectors(
  (state: RootState) => state.organizations.orgs,
);

export const selectOrgs = orgsSelectors.selectAll;

export const selectOrg = orgsSelectors.selectById;

export const selectOrgPagination = (state: RootState) => ({
  total: state.organizations.pagination.total,
  pages: state.organizations.pagination.pages,
});
