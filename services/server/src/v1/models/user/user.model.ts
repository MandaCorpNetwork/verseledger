import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { Contract } from '@V1/models/contract/contract.model';
import { ContractBid } from '@V1/models/contract_bid/contract_bid.model';
import { IdUtil } from '@Utils/IdUtil';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { UserRating } from '@V1/models/user_ratings/user_ratings.model';
import { UserSettings } from '@V1/models/user_settings/user_settings.model';
import {
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import { Notification } from '@V1/models/notifications/notification.model';
import { UserAuth } from '@V1/models/auth/user_auth.model';
import { OrganizationMember } from '../organization/organization_member.model';
@Scopes(() => ({
  bids: {
    include: [{ model: ContractBid, as: 'PostedBids' }],
  },
  bidsWithContracts: {
    include: [{ model: ContractBid, as: 'PostedBids', include: [Contract] }],
  },
  contracts: {
    include: [{ model: Contract, as: 'PostedContracts' }],
  },
  settings: {
    include: [{ model: UserSettings, as: 'Settings' }],
  },
  orgs: {
    include: [
      {
        model: OrganizationMember,
        as: 'OrgMemberships',
        include: ['Org', 'Role'],
      },
    ],
  },
  profile: {
    include: [
      {
        model: UserSettings,
        as: 'Settings',
        where: { key: 'userPageImage' },
        required: false,
      },
      {
        model: OrganizationMember,
        as: 'OrgMemberships',
        where: { primary: true },
        required: false,
        include: ['Org', 'Role'],
      },
    ],
  },
}))
@Table({ tableName: 'users', timestamps: true })
export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements IUser
{
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'User'> {
    return 'User';
  }
  @PrimaryKey
  @Default(IdUtil.generateUserID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: CreationOptional<string>;

  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(32) })
  declare handle: CreationOptional<string>;

  @Default('Unverified User')
  @Column({ type: DataType.STRING(32) })
  declare displayName: CreationOptional<string>;

  @Default(-1)
  @Default(0)
  @Column({ type: DataType.INTEGER() })
  declare total_ratings: CreationOptional<number>;

  @Default(-1)
  @Column({ type: DataType.DOUBLE() })
  declare display_rating: CreationOptional<number>;

  @Default(-1)
  @Column({ type: DataType.DOUBLE() })
  declare weighted_rating: CreationOptional<number>;

  @Default(
    'https://cdn.robertsspaceindustries.com/static/spectrum/images/member-avatar-default.jpg',
  )
  @Column({ type: DataType.TEXT() })
  declare pfp: CreationOptional<string>;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare verified: CreationOptional<boolean>;

  @Default(() => new Date(Date.now()))
  @Column({ type: DataType.DATE() })
  declare last_login: CreationOptional<Date>;

  @HasMany(() => Contract, 'owner_user_id')
  declare PostedContracts: NonAttribute<Awaited<Contract>[]>;

  @HasMany(() => ContractBid, 'user_id')
  declare PostedBids: NonAttribute<Awaited<ContractBid>[]>;

  @HasMany(() => UserRating, 'submitter_id')
  declare SubmittedRatings: NonAttribute<Awaited<UserRating>[]>;

  @HasMany(() => UserRating, 'reciever_id')
  declare ReceivedRatings: NonAttribute<Awaited<UserRating>[]>;

  @HasMany(() => UserSettings, 'user_id')
  declare Settings: NonAttribute<Awaited<UserSettings[]>>;

  @HasMany(() => OrganizationMember, 'user_id')
  declare OrgMemberships: NonAttribute<Awaited<UserSettings[]>>;

  @HasMany(() => UserAuth, `user_id`)
  declare Auth?: NonAttribute<Awaited<UserAuth[]>>;
  declare createAuth: HasManyCreateAssociationMixin<Awaited<UserAuth>>;
  declare hasAuth: HasManyHasAssociationMixin<Awaited<UserAuth>, string>;

  @HasMany(() => Notification, 'user_id')
  declare Notifications: NonAttribute<Awaited<Notification[]>>;
  declare getNotifications: HasManyGetAssociationsMixin<Awaited<Notification>>;
  declare addNotification: HasManyAddAssociationMixin<
    Awaited<Notification>,
    string
  >;
  declare addNotifications: HasManyAddAssociationsMixin<
    Awaited<Notification>,
    string
  >;
  declare setNotifications: HasManySetAssociationsMixin<
    Awaited<Notification>,
    string
  >;
  declare removeNotification: HasManyRemoveAssociationMixin<
    Awaited<Notification>,
    string
  >;
  declare removeNotifications: HasManyRemoveAssociationsMixin<
    Awaited<Notification>,
    string
  >;
  declare hasNotification: HasManyHasAssociationMixin<
    Awaited<Notification>,
    string
  >;
  declare hasNotifications: HasManyHasAssociationsMixin<
    Awaited<Notification>,
    string
  >;
  declare countNotifications: HasManyCountAssociationsMixin;
  declare createNotification: HasManyCreateAssociationMixin<
    Awaited<Notification>,
    'user_id'
  >;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}
