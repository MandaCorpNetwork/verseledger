import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  BelongsTo,
  Default,
} from 'sequelize-typescript';

import { User } from '@V1/models/user/user.model';
import { Organization } from '@V1/models/organization/organization.model';
import { IdUtil } from '@/utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({ tableName: 'organization_members', timestamps: true })
export class OrganizationMember extends Model<
  InferAttributes<OrganizationMember>,
  InferCreationAttributes<OrganizationMember>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'OrganizationMember'> {
    return 'OrganizationMember';
  }
  @PrimaryKey
  @Default(IdUtil.generateMembershipID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: Awaited<User['id']>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare org_id: Awaited<Organization['id']>;

  @Column({ type: DataType.STRING(32) })
  declare role: string;

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: CreationOptional<Awaited<User>>;

  @BelongsTo(() => Organization, { foreignKey: 'org_id', targetKey: 'id' })
  declare Org: CreationOptional<Awaited<Organization>>;
}
