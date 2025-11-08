import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  BelongsTo,
  Scopes,
  Default,
  AllowNull,
} from 'sequelize-typescript';

import { User } from '@V1/models/user/user.model';
import { OrganizationMember } from './organization_member.model';
import { IdUtil } from '@Utils/IdUtil';
import type { IOrganizationInviteStatus } from 'vl-shared/src/schemas/orgs/OrganizationInviteSchema';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { Organization } from './organization.model';

@Scopes(() => ({
  members: {
    include: [
      { model: OrganizationMember, as: 'Members', include: ['User', 'Rank'] },
    ],
  },
}))
@Table({ tableName: 'organizations', timestamps: true })
export class OrganizationInvite extends Model<
  InferAttributes<OrganizationInvite>,
  InferCreationAttributes<OrganizationInvite>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'OrganizationInvite'> {
    return 'OrganizationInvite';
  }
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare organization_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare application_handler: string;

  @Column({
    type: DataType.ENUM(
      'PENDING',
      'ACCEPTED',
      'REJECTED',
      'INVITED',
      'DECLINED',
      'EXPIRED',
      'DISMISSED',
      'WITHDRAWN',
    ),
  })
  declare status: CreationOptional<IOrganizationInviteStatus>;

  @AllowNull
  @Column({ type: DataType.TEXT() })
  declare application_message: CreationOptional<string>;

  @AllowNull
  @Column({ type: DataType.TEXT() })
  declare application_response: CreationOptional<string>;

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: CreationOptional<Awaited<User>>;

  @BelongsTo(() => User, { foreignKey: 'application_handler', targetKey: 'id' })
  declare Handler: CreationOptional<Awaited<User>>;

  @BelongsTo(() => Organization, {
    foreignKey: 'organization_id',
    targetKey: 'id',
  })
  declare Organization: CreationOptional<Awaited<Organization>>;
}
