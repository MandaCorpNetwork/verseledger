import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import { LocationDTO } from '@V1/models/location/mapping/LocationDTO';
import { UserDTO } from '@V1/models/user/mapping/UserDTO';
import type { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import { OrganizationMemberDTO } from './OrganizationMemberDTO';
import { OrganizationRankDTO } from './OrganizationRankDTO';

@ApiModel({
  description: 'Organization Object',
  name: 'Organization',
})
export class OrganizationDTO
  extends DTOBase<IOrganization>
  implements IOrganization
{
  constructor($b: IOrganization) {
    super();
    this.mapProperties($b, {
      Locations: LocationDTO,
      Owner: UserDTO,
      Members: OrganizationMemberDTO,
      Ranks: OrganizationRankDTO,
    });
  }

  public readonly __type = 'Organization';
  public get __partial() {
    return false;
  }

  public toJSON() {
    return {
      ...this,
      __partial: this.__partial,
    };
  }

  public strip() {
    return new OrganizationDTO({
      ...this,
      Owner: undefined,
      Members: undefined,
    });
  }

  @ApiModelProperty({
    description: 'ID of the Org',
    required: true,
    example: 'O-pu2lqjxks971z5ov62t9eg9p',
  })
  id!: string;

  @ApiModelProperty({
    description: 'Owner of the Org',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  owner_id!: string;

  @ApiModelProperty({
    description: 'Org Name',
    required: true,
    example: 'Militant Aggregate and Nexus Development Advisory',
  })
  title!: string;

  @ApiModelProperty({
    description: 'Org Handle',
    required: true,
    example: 'MANDACORP',
  })
  rsi_handle!: string;
}
