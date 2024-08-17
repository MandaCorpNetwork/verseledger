import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@/DTO/DTOBase';
import { ContractDTO } from '@V1/models/contract/mapping/ContractDTO';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { ContractBidDTO } from '@V1/models/contract_bid/ContractBidDTO';

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
    });
  }

  __type = 'User';

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
  discord_id!: string;

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
}
