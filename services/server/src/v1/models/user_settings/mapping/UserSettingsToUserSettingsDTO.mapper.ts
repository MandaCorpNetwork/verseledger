import { Mapper } from '@/infrastructure/Mapper';
import { UserSettings } from '../user_settings.model';
import { UserSettingsDTO } from './UserSettingsDTO';
import { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

export class UserSettingsToUserSettingsDTOMapper extends Mapper<
  UserSettings[],
  UserSettingsDTO
> {
  public static override map(artifacts: UserSettings[]): UserSettingsDTO {
    const settings = artifacts.reduce(
      (e, a) => ({ ...e, [a.getDataValue('key')]: a.getDataValue('value') }),
      {} as IUserSettings,
    );
    return new UserSettingsDTO(settings);
  }
}
