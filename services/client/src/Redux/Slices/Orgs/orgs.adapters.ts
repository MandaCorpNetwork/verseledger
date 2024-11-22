import { createEntityAdapter } from '@reduxjs/toolkit';
import {
  IOrganization,
  IOrganizationMember,
  IOrganizationRole,
} from 'vl-shared/src/schemas/orgs/OrganizationSchema';

export const orgsAdapter = createEntityAdapter({
  selectId: (org: IOrganization) => org.id,
});

export const orgMembersAdapter = createEntityAdapter({
  selectId: (orgMember: IOrganizationMember) => orgMember.id,
});

export const orgRolesAdapter = createEntityAdapter({
  selectId: (role: IOrganizationRole) => role.id,
});
