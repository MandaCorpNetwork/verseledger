import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import type { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

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

  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  public animations!: string;
  @ApiModelProperty({
    description: 'Application Animation Sophistocation',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  public quality!: string;
  @ApiModelProperty({
    description: 'Quality of Components',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  public soundPack!: string;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  public theme!: string;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  public userPageImage!: string;
}
