import { Repository } from "typeorm";

import { UserSetting } from "#/entities/user/user_setting.entity";
import { UserSettingKey } from "#/shared/enum/UserSettingKey";

import { UserSettingsDTO } from "./dto/user_settings.dto";

export class UserSettingService {
  constructor(
    private readonly userSettingRepository: Repository<UserSetting>,
  ) {}

  public settingsToObj(settingsArr: UserSetting[]) {
    const settings = settingsArr.reduce(
      (dto, setting) => ({ ...dto, [setting["key"]]: setting["value"] }),
      {} as UserSettingsDTO,
    );
    return settings;
  }

  public objectToSettings(
    settings: UserSettingsDTO,
    user_id?: string,
  ): UserSetting[] {
    return Object.entries(settings).map(([key, value]) => {
      const setting = new UserSetting();
      setting.key = key as UserSettingKey;
      setting.value = value;
      setting.user_id = user_id;
      return setting;
    });
  }
  public async getUserSettings(user_id: string) {
    const settings = await this.userSettingRepository.find({
      where: { user_id },
    });
    return this.settingsToObj(settings);
  }

  public async updateUserSettings(user_id: string, settings: UserSettingsDTO) {
    const userSettings = this.objectToSettings(settings, user_id);
    return await this.userSettingRepository.upsert(userSettings, {
      conflictPaths: ["key"],
    });
  }
}
