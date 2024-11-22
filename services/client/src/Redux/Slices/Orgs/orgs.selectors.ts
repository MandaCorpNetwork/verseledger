import { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

export const selectOrgs = (state: RootState) => {
  return state.organizations.orgs;
};

export const selectOrgsArray = createSelector([selectOrgs], (orgs) => {
  return Object.values<IOrganization>(orgs);
});

export const selectOrgPagination = (state: RootState) => ({
  total: state.organizations.pagination.total,
  pages: state.organizations.pagination.pages,
});

export const selectOrg = createSelector(
  (state: RootState) => state.organizations.orgs,
  (_: RootState, id: string) => id,
  (orgs, id) => orgs[id],
);
