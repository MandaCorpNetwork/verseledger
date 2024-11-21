import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

import { fetchOrgs } from './actions/get/fetchOrgs.action';

const orgsReducer = createSlice({
  name: 'organizations',
  initialState: {
    orgs: {} as Record<string, IOrganization>,
    pagination: {} as IPaginatedDataSlice,
  },
  reducers: {
    noop() {
      return {
        orgs: {},
        pagination: { total: 0, limit: 0, page: 0, pages: 0 },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrgs.fulfilled, (_state, action) => {
      const pagination = action.payload?.pagination;
      const orgs = action.payload?.data;
      if (orgs) {
        orgs.forEach((org) => {
          _state.orgs[org.id] = org;
        });
      } else {
        Logger.warn('Payload data is undefined or empty');
      }
      if (pagination) {
        _state.pagination = pagination;
      } else {
        Logger.warn('Payload pages is undefined or empty');
      }
    });
  },
});

export default orgsReducer;
export const actions = orgsReducer.actions;
