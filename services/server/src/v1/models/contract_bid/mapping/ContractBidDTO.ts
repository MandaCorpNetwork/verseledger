import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import { IContractBidStatus } from 'vl-shared/src/schemas/ContractBidStatusSchema';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { ContractDTO } from '@V1/models/contract/mapping/ContractDTO';
import { UserDTO } from '@V1/models/user/mapping/UserDTO';

@ApiModel({
  description: 'Contract Bid Object',
  name: 'ContractBid',
})
export class ContractBidDTO
  extends DTOBase<IContractBid>
  implements IContractBid
{
  constructor($b: IContractBid) {
    super();
    this.mapProperties($b, { Contract: ContractDTO, User: UserDTO });
  }

  public strip() {
    return new ContractBidDTO({
      ...this,
      Contract: undefined,
      User: undefined,
    });
  }

  public readonly __type = 'ContractBid';
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
  contract_id!: string;

  @ApiModelProperty({
    description: 'Owner of Contract',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  amount!: number;

  @ApiModelProperty({
    description: 'Owner of Contract',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  user_id!: string;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  status!: IContractBidStatus;
}
