import { Repository } from "typeorm";

import { UserSetting } from "#/entities/user/user_setting.entity";

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
}
