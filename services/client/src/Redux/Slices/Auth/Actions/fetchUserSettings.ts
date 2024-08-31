import { createAsyncThunk } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';

import NetworkService from '@/Services/NetworkService';

export const fetchUserSettings = createAsyncThunk('auth/fetchUserSettings', async () => {
  try {
    const response = await NetworkService.GET('/v1/settings/@me');
    return response.data;
  } catch (error) {
    Logger.error(`Error fetching user settings: ${error}`);
    throw error;
  }
});
