import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import { IOrgSearchCMD } from 'vl-shared/src/schemas/orgs/OrgSearchCMD';

export const fetchOrgs = createAsyncThunk(
  '/v1/orgs/search',
  async (params: IOrgSearchCMD) => {
    try {
      const response = await NetworkService.POST(
        `/v1/organizations/search`,
        params,
        AuthUtil.getAccessHeader(),
      );
      return response.data as IPaginatedData<IOrganization>;
    } catch (error) {
      Logger.error(error);
    }
  },
);
