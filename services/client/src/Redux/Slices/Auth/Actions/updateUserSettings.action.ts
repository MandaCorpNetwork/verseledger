import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IDTO } from 'vl-shared/src/schemas/DTOSchema';
import {
  IUpdateUserSettingsCMD,
  IUserSettings,
} from 'vl-shared/src/schemas/UserSettings';

export const updateUserSettings = createAsyncThunk(
  'auth/updateUserSettings',
  async (settings: IUpdateUserSettingsCMD) => {
    const response = await NetworkService.PATCH<
      IDTO<IUserSettings>,
      IUpdateUserSettingsCMD
    >('/v1/settings/@me', settings, AuthUtil.getAccessHeader());
    return response.data;
  },
);
