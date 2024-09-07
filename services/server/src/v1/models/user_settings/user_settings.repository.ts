import { injectable } from 'inversify';
import { UserSettings } from './user_settings.model';

@injectable()
export class UserSettingsRepository {
  private static UserSettings = UserSettings;
  public static async getUserSettings(user_id: string) {
    return UserSettingsRepository.UserSettings.findAll({
      where: {
        user_id,
      },
    });
  }
  public static async updateUserSettings(
    settings: {
      id: string;
      key: string;
      value: string | null;
      user_id: string;
    }[],
  ) {
    const response = await UserSettingsRepository.UserSettings.bulkCreate(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      settings as any,
      {
        updateOnDuplicate: ['value'],
        fields: ['value'],
        returning: true,
        individualHooks: true,
      },
    );
    return response;
  }
  public static async getUserPageImage(user_id: string) {
    const userSettings = await UserSettingsRepository.UserSettings.findOne({
      where: {
        user_id,
        key: 'userPageImage',
      },
    });
    return userSettings?.value;
  }
}
