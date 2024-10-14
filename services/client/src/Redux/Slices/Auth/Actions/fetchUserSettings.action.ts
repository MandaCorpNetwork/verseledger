import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { IDTO } from 'vl-shared/src/schemas/DTOSchema';
import { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

import NetworkService from '@/Services/NetworkService';

export const fetchUserSettings = createAsyncThunk('auth/fetchUserSettings', async () => {
  const response = await NetworkService.GET<IDTO<IUserSettings>>(
    '/v1/settings/@me',
    AuthUtil.getAccessHeader(),
  );
  Logger.info(`User Settings Fetched`, response.data);
  return response.data;
});
