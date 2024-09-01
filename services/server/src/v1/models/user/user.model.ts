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
import { Contract } from '@V1/models/contract/contract.model';
import { ContractBid } from '@V1/models/contract_bid/contract_bid.model';
import { IdUtil } from '@/utils/IdUtil';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { UserRating } from '@V1/models/user_ratings/user_ratings.model';
import { UserSettings } from '../user_settings/user_settings.model';
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
  settings: {
    include: [{ model: UserSettings, as: 'Settings' }],
  },
  profile: {
    include: [
      {
        model: UserSettings,
        as: 'Settings',
        where: { key: 'userPageImage' },
        required: false,
      },
    ],
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

  @HasMany(() => UserRating, 'submitter_id')
  declare SubmittedRatings: Awaited<UserRating>[];

  @HasMany(() => UserRating, 'reciever_id')
  declare ReceivedRatings: Awaited<UserRating>[];

  @HasMany(() => UserSettings, 'user_id')
  declare Settings: Awaited<UserSettings[]>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
