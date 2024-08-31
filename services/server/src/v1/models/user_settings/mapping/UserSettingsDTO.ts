import { ApiModel } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

@ApiModel({
  description: 'Contract Bid Object',
  name: 'UserSettings',
})
export class UserSettingsDTO
  extends DTOBase<IUserSettings>
  implements IUserSettings
{
  constructor($b: IUserSettings) {
    super();
    this.mapProperties($b);
  }

  __type = 'UserSettings';

  public animations!: string;
  public quality!: string;
  public soundPack!: string;
  public theme!: string;
  public userPageImage!: string;
}
