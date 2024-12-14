import { Logger } from '@Utils/Logger';
import { injectable } from 'inversify';
import { UserSettingsRepository } from './user_settings.repository';
import type { IUpdateUserSettingsCMD } from 'vl-shared/src/schemas/UserSettings';
import { UserSettingCMDToUserSettingsDataMapper } from './mapping/UserSettingCMDToUserSettingsData.mapper';

@injectable()
export class UserSettingsService {
  constructor() {
    Logger.init();
  }

  public async getUserSettings(user_id: string) {
    return UserSettingsRepository.getUserSettings(user_id);
  }

  public async updateUserSettings(
    user_id: string,
    settingsCMD: IUpdateUserSettingsCMD,
  ) {
    const updateSettings = UserSettingCMDToUserSettingsDataMapper.map({
      ...settingsCMD,
      user_id,
    });
    return UserSettingsRepository.updateUserSettings(updateSettings);
  }

  public async getUserPageImage(user_id: string) {
    return UserSettingsRepository.getUserPageImage(user_id);
  }
}
