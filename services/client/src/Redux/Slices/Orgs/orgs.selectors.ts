import { RootState } from '@Redux/store';

import {
  orgMembersAdapter,
  orgRolesAdapter,
  orgsAdapter,
  userOrgMemberAdapter,
} from './orgs.adapters';

const orgsSelectors = orgsAdapter.getSelectors(
  (state: RootState) => state.organizations.orgs,
);

const userOrgSelectors = userOrgMemberAdapter.getSelectors(
  (state: RootState) => state.organizations.userMemberships,
);

const orgMembersSelectors = orgMembersAdapter.getSelectors(
  (state: RootState) => state.organizations.orgMembers,
);

const orgRolesSelectors = orgRolesAdapter.getSelectors(
  (state: RootState) => state.organizations.orgRoles,
);

export const selectUserMemberships = userOrgSelectors.selectAll;

export const selectUserMembership = userOrgSelectors.selectById;

export const selectUserMembershipByOrgId = (state: RootState, orgId: string) => {
  return userOrgSelectors
    .selectAll(state)
    .find((membership) => membership.org_id === orgId);
};

export const selectOrgs = orgsSelectors.selectAll;

export const selectOrg = orgsSelectors.selectById;

export const selectOrgPagination = (state: RootState) => ({
  total: state.organizations.pagination.total,
  pages: state.organizations.pagination.pages,
});

export const selectOrgMembersByOrgId = (state: RootState, orgId: string) => {
  return orgMembersSelectors.selectAll(state).filter((member) => member.org_id === orgId);
};

export const selectOrgRolesByOrgId = (state: RootState, orgId: string) => {
  return orgRolesSelectors.selectAll(state).filter((role) => role.org_id === orgId);
};
