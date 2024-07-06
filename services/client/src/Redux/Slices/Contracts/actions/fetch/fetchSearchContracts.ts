import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';

import NetworkService from '@/Services/NetworkService';

export const fetchContractsBySubtypes = createAsyncThunk(
  '/v1/contracts/filterSubType',
  async (subtypes: string[]) => {
    const subtypesString = subtypes.join(',');
    const response = await NetworkService.GET(
      `/v1/contracts/search?subtype=${subtypesString}`,
      AuthUtil.getAccessHeader(),
    );
    Logger.info(`Subtype Filter Thunk Response: ${response.data}`);
    return response.data;
  },
);
