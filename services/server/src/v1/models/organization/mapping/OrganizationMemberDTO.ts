import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from '@V1/DTO/DTOBase';
import { UserDTO } from '@V1/models/user/mapping/UserDTO';
import { IOrganizationMember } from 'vl-shared/src/schemas/orgs/OrganizationSchema';
import { OrganizationDTO } from './OrganizationDTO';

@ApiModel({
  description: 'Organization Object',
  name: 'OrganizationMember',
})
export class OrganizationMemberDTO
  extends DTOBase<IOrganizationMember>
  implements IOrganizationMember
{
  constructor($b: IOrganizationMember) {
    super();
    this.mapProperties($b, {
      Org: OrganizationDTO,
      User: UserDTO,
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
    return new OrganizationMemberDTO({
      ...this,
      User: undefined,
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
  user_id!: string;

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
  role!: string;

  @ApiModelProperty({
    description: 'Org Handle',
    required: true,
    example: 'MANDACORP',
  })
  joined!: Date;
}
