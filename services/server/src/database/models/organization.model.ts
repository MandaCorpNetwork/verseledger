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

import { User } from './user.model';
import { OrganizationMember } from './organization_member.model';
import { IdUtil } from '@/utils/IdUtil';

@Scopes(() => ({
  members: {
    include: [{ model: OrganizationMember, as: 'Members', include: ['User'] }],
  },
}))
@Table({ tableName: 'organizations', timestamps: true })
export class Organization extends Model {
  @Column({ type: DataType.VIRTUAL })
  get __type(): 'Organization' {
    return 'Organization';
  }
  @PrimaryKey
  @Default(IdUtil.generateOrgID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare owner_id: Awaited<User['id']>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare owner_org_id: Awaited<User['id']>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare owner_user_id: Awaited<User['id']>;

  @Column({ type: DataType.STRING(32) })
  declare title: string;

  @Column({ type: DataType.STRING(32) })
  declare rsi_handle: string;

  @BelongsTo(() => User, { foreignKey: 'owner_id', targetKey: 'id' })
  declare Owner: Awaited<User>;

  @HasMany(() => OrganizationMember, 'org_id')
  declare Members: Awaited<OrganizationMember>[];
}
