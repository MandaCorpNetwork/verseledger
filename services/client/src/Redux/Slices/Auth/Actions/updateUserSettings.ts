import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUpdateUserSettingsCMD } from 'vl-shared/src/schemas/UserSettings';

import NetworkService from '@/Services/NetworkService';

export const updateUserSettings = createAsyncThunk(
  'auth/updateUserSettings',
  async (settings: IUpdateUserSettingsCMD) => {
    const response = await NetworkService.PATCH('/v1/settings/@me', settings);
    return response.data;
  },
);
