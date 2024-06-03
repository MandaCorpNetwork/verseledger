import {
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { IUser } from '@Interfaces/IUser';
import { Contract } from './contract.model';
import { ContractBid } from './contract_bid.model';
import { IdUtil } from '@/utils/IdUtil';
@DefaultScope(() => ({
  attributes: {
    exclude: ['discord_id'],
  },
}))
@Scopes(() => ({
  bids: {
    include: [{ model: ContractBid, as: 'PostedBids' }],
  },
  discord: {
    attributes: { include: ['discord_id'] },
  },
  contracts: {
    include: [{ model: Contract, as: 'PostedContracts' }],
  },
}))
@Table({ tableName: 'users', timestamps: true })
export class User extends Model implements IUser {
  @PrimaryKey
  @Default(IdUtil.generateUserID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: string;

  @Column({ type: DataType.STRING(20) })
  declare discord_id: string | null;

  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(32) })
  declare handle: string | null;

  @Default('Unverified User')
  @Column({ type: DataType.STRING(32) })
  declare displayName: string | null;

  @Default(
    'https://cdn.robertsspaceindustries.com/static/spectrum/images/member-avatar-default.jpg',
  )
  @Column({ type: DataType.TEXT() })
  declare pfp: string | null;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare verified: boolean;

  @HasMany(() => Contract, 'owner_user_id')
  declare PostedContracts: Awaited<Contract>[];

  @HasMany(() => ContractBid, 'user_id')
  declare PostedBids: Awaited<ContractBid>[];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
