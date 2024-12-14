import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { ICreateOrganizationCMD } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

export const POST_CREATE_ORG = 'POST v1/organizations';

export const postCreateOrg = createAsyncThunk(
  POST_CREATE_ORG,
  async (orgData: ICreateOrganizationCMD) => {
    const response = await NetworkService.POST(
      '/v1/organizations',
      orgData,
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
