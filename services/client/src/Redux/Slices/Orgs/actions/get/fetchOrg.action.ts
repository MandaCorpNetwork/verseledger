import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

import { orgActions } from '../../orgs.reducer';

export const FETCH_ORG = 'GET /v1/orgs/:orgId';

export const fetchOrg = createAsyncThunk(
  FETCH_ORG,
  async (orgId: string, { dispatch }) => {
    const response = await NetworkService.GET(
      `/v1/organizations/${orgId}`,
      AuthUtil.getAccessHeader(),
    );
    dispatch(orgActions.upsertOrg(response.data));
    return response.data;
  },
);
