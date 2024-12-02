import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import { IOrganizationRank } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import { OrganizationDTO } from './OrganizationDTO';

@ApiModel({
  description: 'Organization Object',
  name: 'OrganizationMember',
})
export class OrganizationRankDTO
  extends DTOBase<IOrganizationRank>
  implements IOrganizationRank
{
  constructor($b: IOrganizationRank) {
    super();
    this.mapProperties($b, {
      Org: OrganizationDTO,
    });
  }

  public readonly __type = 'OrganizationMember';
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
    return new OrganizationRankDTO({
      ...this,
      Org: undefined,
    });
  }

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'O-pu2lqjxks971z5ov62t9eg9p',
  })
  id!: string;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  org_id!: string;

  @ApiModelProperty({
    description: 'Org Role',
    required: true,
    example: 'Militant Aggregate and Nexus Development Advisory',
  })
  rank_name!: string;

  @ApiModelProperty({
    description: 'Org Handle',
    required: true,
    example: 'MANDACORP',
  })
  joined!: Date;
}
