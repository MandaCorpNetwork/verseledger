import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import type { IDTO } from 'vl-shared/src/schemas/DTOSchema';
import type { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

export const fetchUserSettings = createAsyncThunk('auth/fetchUserSettings', async () => {
  const response = await NetworkService.GET<IDTO<IUserSettings>>(
    '/settings/@me',
    AuthUtil.getAccessHeader(),
  );
  Logger.info(`User Settings Fetched`, response.data);
  return response.data;
});
