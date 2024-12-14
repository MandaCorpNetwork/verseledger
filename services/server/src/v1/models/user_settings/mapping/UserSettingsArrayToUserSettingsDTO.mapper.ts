import { Mapper } from '@Infrastructure/Mapper';
import type { UserSettings } from '@V1/models/user_settings/user_settings.model';
import { UserSettingsDTO } from './UserSettingsDTO';
import type { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

export class UserSettingsArrayToUserSettingsDTOMapper extends Mapper<
  UserSettings[],
  UserSettingsDTO
> {
  public static override map(artifacts: UserSettings[]): UserSettingsDTO {
    const settings = artifacts.reduce(
      (e, a) => ({ ...e, [a['key']]: a['value'] }),
      {} as IUserSettings,
    );
    return new UserSettingsDTO(settings);
  }
}
