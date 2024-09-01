import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';

import NetworkService from '@/Services/NetworkService';

export const fetchUserSettings = createAsyncThunk('auth/fetchUserSettings', async () => {
  try {
    const response = await NetworkService.GET(
      '/v1/settings/@me',
      AuthUtil.getAccessHeader(),
    );
    Logger.info(`User Settings Fetched`, response.data);
    return response.data;
  } catch (error) {
    Logger.error(`Error fetching user settings: ${error}`);
    throw error;
  }
});
