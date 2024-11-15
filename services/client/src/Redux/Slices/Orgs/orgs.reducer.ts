import { createSlice } from '@reduxjs/toolkit';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

const orgsReducer = createSlice({
  name: 'Organizations',
  initialState: {
    orgs: {} as Record<string, IOrganization>,
  },
  reducers: {
    noop() {
      return {
        orgs: {},
      };
    },
  },
});

export default orgsReducer;
export const actions = orgsReducer.actions;
