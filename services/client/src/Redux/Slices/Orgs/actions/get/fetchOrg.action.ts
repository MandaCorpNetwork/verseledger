import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IOrganizationWithMembers } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

import { orgActions } from '../../orgs.reducer';

export const FETCH_ORG = 'GET /v1/orgs/:orgId';

export const fetchOrg = createAsyncThunk(
  FETCH_ORG,
  async (orgId: string, { dispatch }) => {
    const response = await NetworkService.GET(
      `/v1/organizations/${orgId}`,
      AuthUtil.getAccessHeader(),
    );
    const data = response.data;
    if (data && typeof data === 'object') {
      if ('Members' in data) {
        const members = (data as IOrganizationWithMembers).Members;
        dispatch(orgActions.upsertMembers(members));
      }
      if ('Ranks' in data) {
        const roles = (data as IOrganizationWithMembers).Ranks;
        dispatch(orgActions.upsertRoles(roles));
      }
    }
    dispatch(orgActions.upsertOrg(response.data));
    return response.data;
  },
);
