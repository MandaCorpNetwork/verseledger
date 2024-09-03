import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

import { IContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';

import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';

import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { DTOBase } from '@V1/DTO/DTOBase';
import { LocationDTO } from '@V1/models/location/mapping/LocationDTO';
import { ContractBidDTO } from '@V1/models/contract_bid/mapping/ContractBidDTO';
import { UserDTO } from '@V1/models/user/mapping/UserDTO';

@ApiModel({
  description: 'Contract Object',
  name: 'Contract',
})
export class ContractDTO extends DTOBase<IContract> implements IContract {
  constructor($b: IContract) {
    super();
    this.mapProperties($b, {
      Locations: LocationDTO,
      Bids: ContractBidDTO,
      Owner: UserDTO,
    });
  }

  public readonly __type = 'Contract';
  public get __partial() {
    return false;
  }

  public toJSON() {
    return {
      ...this,
      __partial: this.__partial,
      owner_user_id: undefined,
      owner_org_id: undefined,
    };
  }

  public strip() {
    return new ContractDTO({
      ...this,
      Locations: undefined,
      Owner: undefined,
      User: undefined,
    });
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
  owner_id!: string;

  @ApiModelProperty({
    description: 'Title of Contract',
    required: true,
    example: 'My Awesome Contract',
  })
  title!: string;

  @ApiModelProperty({
    description: 'Type of Contract',
    required: true,
    example: 'Manage',
  })
  subtype!: IContractSubType;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  bidDate!: Date;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  Locations!: ILocation[];

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  briefing!: string;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  contractorLimit!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  defaultPay!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  endDate!: Date;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  isBargaining!: boolean;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  isBonusPay!: boolean;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  isEmergency!: boolean;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  payStructure!: IContractPayStructure;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  ratingLimit!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  startDate!: Date;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 123456789,
  })
  status!: string;
}
