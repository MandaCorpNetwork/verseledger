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
import { Contract } from './contract.model';
import { ContractBid } from './contract_bid.model';
import { IdUtil } from '@/utils/IdUtil';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { UserRating } from './user_ratings.model';
@DefaultScope(() => ({
  attributes: {
    exclude: ['discord_id'],
  },
}))
@Scopes(() => ({
  bids: {
    include: [{ model: ContractBid, as: 'PostedBids' }],
  },
  bidsWithContracts: {
    include: [{ model: ContractBid, as: 'PostedBids', include: [Contract] }],
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
  @Column({ type: DataType.VIRTUAL })
  get __type(): 'User' {
    return 'User';
  }
  @PrimaryKey
  @Default(IdUtil.generateUserID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: string;

  @Column({ type: DataType.STRING(20) })
  declare discord_id: string | null;

  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(32) })
  declare handle: string;

  @Default('Unverified User')
  @Column({ type: DataType.STRING(32) })
  declare displayName: string;

  @Default(
    'https://cdn.robertsspaceindustries.com/static/spectrum/images/member-avatar-default.jpg',
  )
  @Column({ type: DataType.TEXT() })
  declare pfp: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare verified: boolean;

  @HasMany(() => Contract, 'owner_user_id')
  declare PostedContracts: Awaited<Contract>[];

  @HasMany(() => ContractBid, 'user_id')
  declare PostedBids: Awaited<ContractBid>[];

  @HasMany(() => UserRating, 'rating_id')
  declare Ratings: Awaited<UserRating>[];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
