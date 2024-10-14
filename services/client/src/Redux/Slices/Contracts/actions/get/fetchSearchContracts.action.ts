import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';

export const fetchContractsBySubtypes = createAsyncThunk(
  '/v1/contracts/search',
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
