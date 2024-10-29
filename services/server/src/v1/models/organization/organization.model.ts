import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  BelongsTo,
  HasMany,
  Scopes,
  Default,
} from 'sequelize-typescript';

import { User } from '@V1/models/user/user.model';
import { OrganizationMember } from './organization_member.model';
import { IdUtil } from '@Utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { OrganizationInvite } from './organization_invite.model';

@Scopes(() => ({
  members: {
    include: [{ model: OrganizationMember, as: 'Members', include: ['User'] }],
  },
}))
@Table({ tableName: 'organizations', timestamps: true })
export class Organization extends Model<
  InferAttributes<Organization>,
  InferCreationAttributes<Organization>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'Organization'> {
    return 'Organization';
  }
  @PrimaryKey
  @Default(IdUtil.generateOrgID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare owner_id: Awaited<User['id']>;

  @Column({ type: DataType.STRING(32) })
  declare title: string;

  @Column({ type: DataType.STRING(32) })
  declare rsi_handle: string;

  @BelongsTo(() => User, { foreignKey: 'owner_id', targetKey: 'id' })
  declare Owner: CreationOptional<Awaited<User>>;

  @HasMany(() => OrganizationMember, 'org_id')
  declare Members: CreationOptional<Awaited<OrganizationMember>[]>;

  @HasMany(() => OrganizationInvite, 'organization_id')
  declare Invites: CreationOptional<Awaited<OrganizationInvite>>;
}
