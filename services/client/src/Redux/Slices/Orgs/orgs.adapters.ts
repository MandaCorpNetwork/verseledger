import { createEntityAdapter } from '@reduxjs/toolkit';
import type {
  IOrganization,
  IOrganizationMember,
  IOrganizationMemberWithOrg,
  IOrganizationRank,
} from 'vl-shared/src/schemas/orgs/OrganizationSchema';

export const orgsAdapter = createEntityAdapter({
  selectId: (org: IOrganization) => org.id,
});

export const orgMembersAdapter = createEntityAdapter({
  selectId: (orgMember: IOrganizationMember) => orgMember.id,
});

export const orgRolesAdapter = createEntityAdapter({
  selectId: (role: IOrganizationRank) => role.id,
});

export const userOrgMemberAdapter = createEntityAdapter({
  selectId: (orgMember: IOrganizationMemberWithOrg) => orgMember.id,
});
