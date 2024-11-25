import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  BelongsTo,
  Default,
  Scopes,
} from 'sequelize-typescript';

import { User } from '@V1/models/user/user.model';
import { Organization } from '@V1/models/organization/organization.model';
import { IdUtil } from '@Utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { OrganizationRole } from './organization_role.model';

@Scopes(() => ({
  role: {
    include: [{ model: OrganizationRole, as: 'Role' }],
  },
}))
@Table({ tableName: 'organization_member', timestamps: true })
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

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare role_id: Awaited<OrganizationRole['id']>;

  @Column({ type: DataType.DATE() })
  declare joined: CreationOptional<Date>;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare primary: CreationOptional<boolean>;

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: CreationOptional<Awaited<User>>;

  @BelongsTo(() => OrganizationRole, { foreignKey: 'role_id', targetKey: 'id' })
  declare Role: CreationOptional<Awaited<User>>;

  @BelongsTo(() => Organization, { foreignKey: 'org_id', targetKey: 'id' })
  declare Org: CreationOptional<Awaited<Organization>>;
}
