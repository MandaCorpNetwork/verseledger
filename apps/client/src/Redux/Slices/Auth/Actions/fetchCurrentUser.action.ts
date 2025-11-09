import { orgActions } from '@Redux/Slices/Orgs/orgs.reducer';
import { usersActions } from '@Redux/Slices/Users/users.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { IOrganizationMemberWithOrg } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import type { IUser } from 'vl-shared/src/schemas/UserSchema';

export const FETCH_CURRENT_USER = 'GET /users/@me';

export const fetchCurrentUser = createAsyncThunk(
  FETCH_CURRENT_USER,
  async (_, { dispatch }) => {
    const response = await NetworkService.GET(
      '/users/@me',
      AuthUtil.getAccessHeader(),
    );
    const data = response.data;
    if (data && typeof data === 'object') {
      if ('OrgMemberships' in data) {
        const orgMemberships = (data as { OrgMemberships: IOrganizationMemberWithOrg[] })
          .OrgMemberships;

        dispatch(orgActions.addUserMemberships(orgMemberships));
      }
    }
    const user = data as IUser;
    dispatch(usersActions.upsertUser(user));
    return response.data;
  },
);
