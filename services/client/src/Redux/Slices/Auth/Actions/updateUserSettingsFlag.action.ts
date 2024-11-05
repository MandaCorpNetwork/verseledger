import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IDTO } from 'vl-shared/src/schemas/DTOSchema';
import {
  IUpdateUserSettingsFlagsCMD,
  IUserSettings,
} from 'vl-shared/src/schemas/UserSettings';

export const updateUserSettingsFlag = createAsyncThunk(
  'auth/updateUserSettings',
  async (settings: IUpdateUserSettingsFlagsCMD) => {
    const response = await NetworkService.PATCH<
      IDTO<IUserSettings>,
      IUpdateUserSettingsFlagsCMD
    >('/v1/settings/@me/flags', settings, AuthUtil.getAccessHeader());
    return response.data;
  },
);
