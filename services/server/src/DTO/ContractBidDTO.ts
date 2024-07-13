import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from './DTOBase';
import { IContractBidStatus } from 'vl-shared/src/schemas/ContractBidStatusSchema';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { ContractDTO } from './ContractDTO';
import { UserDTO } from './UserDTO';

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

  __type = 'ContractBid';

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
  user_id!: string;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  status!: IContractBidStatus;
}
