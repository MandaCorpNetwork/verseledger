import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import type { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
import type { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import type { IOrgSearchCMD } from 'vl-shared/src/schemas/orgs/OrgSearchCMD';

import { orgActions } from '../../orgs.reducer';

export const fetchOrgs = createAsyncThunk(
  '/v1/orgs/search',
  async (params: IOrgSearchCMD, { dispatch }) => {
    try {
      const response = await NetworkService.POST(
        `/v1/organizations/search`,
        params,
        AuthUtil.getAccessHeader(),
      );
      const data = response.data as IPaginatedData<IOrganization>;
      dispatch(orgActions.setOrgs(data.data));
      return data;
    } catch (error) {
      Logger.error(error);
    }
  },
);
