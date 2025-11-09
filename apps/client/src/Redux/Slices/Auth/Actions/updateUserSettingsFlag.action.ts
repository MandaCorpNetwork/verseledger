import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { IDTO } from 'vl-shared/src/schemas/DTOSchema';
import type {
  IUpdateUserSettingsFlagsCMD,
  IUserSettings,
} from 'vl-shared/src/schemas/UserSettings';

export const updateUserSettingsFlag = createAsyncThunk(
  'auth/updateUserSettings',
  async (settings: IUpdateUserSettingsFlagsCMD) => {
    const response = await NetworkService.PATCH<
      IDTO<IUserSettings>,
      IUpdateUserSettingsFlagsCMD
    >('/settings/@me/flags', settings, AuthUtil.getAccessHeader());
    return response.data;
  },
);
