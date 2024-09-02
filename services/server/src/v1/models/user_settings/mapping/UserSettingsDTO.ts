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

  public readonly __type = 'UserSettings';
  public get __partial() {
    return (
      this.animations == null ||
      this.quality == null ||
      this.soundPack == null ||
      this.theme == null ||
      this.userPageImage == null
    );
  }

  public toJSON() {
    return { ...this, __partial: this.__partial };
  }

  public animations!: string;
  public quality!: string;
  public soundPack!: string;
  public theme!: string;
  public userPageImage!: string;
}
