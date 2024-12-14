import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

import type { IContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';

import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

import type { IContractSubType } from 'vl-shared/src/schemas/contracts/ContractSubTypeSchema';

import type { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { DTOBase } from '@V1/DTO/DTOBase';
import { LocationDTO } from '@V1/models/location/mapping/LocationDTO';
import { ContractBidDTO } from '@V1/models/contract_bid/mapping/ContractBidDTO';
import { UserDTO } from '@V1/models/user/mapping/UserDTO';
import { RatingDTO } from '@V1/models/user_ratings/mapping/UserRatingDTO';

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
      Ratings: RatingDTO,
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
      Rating: undefined,
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
    type: 'string',
    required: true,
    example: new Date(new Date().setFullYear(2954)),
  })
  bidDate!: Date;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
  })
  Locations!: ILocation[];

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'This is a Briefing',
  })
  briefing!: string;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 5,
  })
  contractorLimit!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 20_000,
  })
  defaultPay!: number;

  @ApiModelProperty({
    description: 'TODO',
    type: 'string',
    required: true,
    example: new Date(new Date().setFullYear(2954)),
  })
  endDate!: Date;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: true,
  })
  isBargaining!: boolean;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: false,
  })
  isBonusPay!: boolean;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: false,
  })
  isEmergency!: boolean;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'FLAT_RATE',
  })
  payStructure!: IContractPayStructure;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 0.6,
  })
  ratingLimit!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    type: 'string',
    example: new Date(new Date().setFullYear(2954)),
  })
  startDate!: Date;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'PENDING',
  })
  status!: string;
}
