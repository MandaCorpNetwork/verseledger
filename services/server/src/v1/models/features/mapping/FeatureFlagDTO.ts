import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

@ApiModel({
  description: 'Contract Object',
  name: 'Contract',
})
export class FeatureFlagDTO
  extends DTOBase<IFeatureFlag>
  implements IFeatureFlag
{
  constructor($b: IFeatureFlag) {
    super();
    this.mapProperties($b);
  }

  public readonly __type = 'FeatureFlag';
  public get __partial() {
    return (
      this.percentageOfUsers == null ||
      this.settingName == null ||
      this.settingValue == null
    );
  }

  public toJSON() {
    return {
      ...this,
      __partial: this.__partial,
    };
  }

  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  declare id: string;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  declare name: string;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  declare description: string;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  declare enabled: boolean;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: false,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  declare percentageOfUsers: number;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: false,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  declare settingName: string;
  @ApiModelProperty({
    description: 'ID of Contract',
    required: false,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  declare settingValue: string;
}
