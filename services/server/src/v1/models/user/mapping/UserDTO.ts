import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import { ContractDTO } from '@V1/models/contract/mapping/ContractDTO';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { ContractBidDTO } from '@V1/models/contract_bid/mapping/ContractBidDTO';
import { UserSettingsArrayToUserSettingsDTOMapper } from '@V1/models/user_settings/mapping/UserSettingsArrayToUserSettingsDTO.mapper';
import { NotificationDTO } from '@V1/models/notifications/mapping/NotificationDTO';
import { OrganizationMemberDTO } from '@V1/models/organization/mapping/OrganizationMemberDTO';

@ApiModel({
  description: 'Contract Bid Object',
  name: 'ContractBid',
})
export class UserDTO extends DTOBase<IUser> implements IUser {
  constructor($b: IUser) {
    super();
    this.mapProperties($b, {
      PostedContracts: ContractDTO,
      PostedBids: ContractBidDTO,
      Settings: {
        mapper: UserSettingsArrayToUserSettingsDTOMapper,
        keepArray: true,
      },
      Notifications: NotificationDTO,
      OrgMemberships: OrganizationMemberDTO,
    });
  }

  public readonly __type = 'User';
  public get __partial() {
    return false;
  }

  public toJSON() {
    return { ...this, __partial: this.__partial };
  }

  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  id!: string;

  @ApiModelProperty({
    description: 'Owner of Contract',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  handle!: string;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  displayName!: string;
  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  pfp!: string;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  verified!: boolean;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  total_ratings!: number;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  display_rating!: number;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  weighted_rating!: number;
}
