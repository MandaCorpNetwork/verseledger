import { Mapper } from '@Infrastructure/Mapper';
import { IUpdateUserSettingsCMD } from 'vl-shared/src/schemas/UserSettings';

export class UserSettingCMDToUserSettingsDataMapper extends Mapper<
  IUpdateUserSettingsCMD[],
  { key: string; value: string | null; user_id: string }[]
> {
  public static override map(
    cmd: IUpdateUserSettingsCMD & { user_id: string },
  ): { id: string; key: string; value: string | null; user_id: string }[] {
    const user_id = cmd.user_id;
    const updateProps = { ...cmd, user_id: undefined };
    delete updateProps.user_id;
    return Object.keys(cmd)
      .map((o) => {
        if (o == 'user_id') return undefined;
        return {
          id: `${user_id}/${o}`,
          user_id,
          key: o,
          value: updateProps[o as 'theme'] as string | null,
        };
      })
      .filter((a) => a != undefined);
  }
}
