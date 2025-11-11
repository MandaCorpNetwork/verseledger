import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  Default,
  BelongsTo,
  HasMany,
  AllowNull,
  DefaultScope,
  Scopes,
  BelongsToMany,
} from 'sequelize-typescript';

import type { IContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import { User } from '@V1/models/user/user.model';
import { ContractBid } from '@V1/models/contract_bid/contract_bid.model';
import { IdUtil } from '@Utils/IdUtil';
import type {
  CreationOptional,
  ForeignKey as ForeignKeyType,
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
  NonAttribute,
} from 'sequelize';
import type { Organization } from '@V1/models/organization/organization.model';
import { OwnerType } from '@Utils/OwnerType';
import { Location } from '@V1/models/location/location.model';
import { ContractLocation } from './contract_locations.model';
import type { IContractStatus } from 'vl-shared/src/schemas/contracts/ContractStatusSchema';
import type { IContractSubType } from 'vl-shared/src/schemas/contracts/ContractSubTypeSchema';
import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { UserRating } from '@V1/models/user_ratings/user_ratings.model';
import { UserSettings } from '@V1/models/user_settings/user_setting.model';
import { OrganizationMember } from '../organization/organization_member.model';
@Scopes(() => ({
  bids: {
    include: [
      {
        model: ContractBid,
        as: 'Bids',
        include: [
          {
            model: User,
            as: 'User',
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
                include: ['Org', 'Rank'],
              },
            ],
          },
        ],
      },
    ],
  },
  owner: {
    include: [
      {
        model: User,
        as: 'Owner',
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
            include: ['Org', 'Rank'],
          },
        ],
      },
    ],
  },
  locations: {
    include: [{ model: Location, as: 'Locations' }],
  },
  ratings: {
    include: [{ model: UserRating, as: 'Ratings' }],
  },
}))
@DefaultScope(() => ({
  attributes: {
    include: ['owner_id'],
  },
}))
@Table({ tableName: 'contracts', timestamps: true })
export class Contract
  extends Model
  implements Omit<IContract, 'Locations' | 'Bids'>
{
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'Contract'> {
    return 'Contract';
  }

  @PrimaryKey
  @Default(IdUtil.generateContractID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(32) })
  declare title: string;

  @Column({
    type: DataType.STRING(32),
  })
  declare subtype: IContractSubType;

  @Column({ type: DataType.TEXT() })
  declare briefing: string;

  @Column({ type: DataType.VIRTUAL() })
  get owner_id(): NonAttribute<
    Awaited<User['id']> | Awaited<Organization['id']>
  > {
    return (
      this.getDataValue('owner_org_id') ?? this.getDataValue('owner_user_id')
    );
  }

  set owner_id(value: string) {
    const type = IdUtil.getOwnerType(value);
    switch (type) {
      case OwnerType.User: {
        this.setDataValue('owner_user_id', value);
        break;
      }
      case OwnerType.Org: {
        this.setDataValue('owner_org_id', value);
        break;
      }
      default:
        throw new Error('Invalid ID');
    }
  }

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare owner_org_id?: ForeignKeyType<Awaited<User['id']>>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare owner_user_id?: ForeignKeyType<Awaited<User['id']>>;

  @AllowNull
  @Column({ type: DataType.DATE() })
  declare bidDate: Date;

  @AllowNull
  @Column({ type: DataType.DATE() })
  declare startDate: Date;

  @AllowNull
  @Column({ type: DataType.DATE() })
  declare endDate: Date;

  @Default(false)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isEmergency: boolean;

  @Column({ type: DataType.FLOAT() })
  declare ratingLimit: number;

  @AllowNull
  @Column({ type: DataType.TINYINT({ unsigned: true }) })
  declare contractorLimit: number;

  @Column({ type: DataType.STRING(32) })
  declare payStructure: IContractPayStructure;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isBargaining: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isBonusPay: boolean;

  @Column({ type: DataType.DOUBLE() })
  declare defaultPay: number;

  @Default('BIDDING')
  @Column({
    type: DataType.ENUM(
      'BIDDING',
      'PENDING',
      'INPROGRESS',
      'COMPLETED',
      'CANCELED',
    ),
  })
  declare status: CreationOptional<IContractStatus>;

  @BelongsTo(() => User, { foreignKey: 'owner_user_id', targetKey: 'id' })
  declare Owner?: NonAttribute<Awaited<User>>;

  @HasMany(() => ContractBid, 'contract_id')
  declare Bids?: NonAttribute<Awaited<ContractBid>[]>;
  declare getBids: HasManyGetAssociationsMixin<Awaited<ContractBid>>;
  declare addBid: HasManyAddAssociationMixin<Awaited<ContractBid>, string>;
  declare addBids: HasManyAddAssociationsMixin<Awaited<ContractBid>, string>;
  declare setBids: HasManySetAssociationsMixin<Awaited<ContractBid>, string>;
  declare removeBid: HasManyRemoveAssociationMixin<
    Awaited<ContractBid>,
    string
  >;
  declare removeBids: HasManyRemoveAssociationsMixin<
    Awaited<ContractBid>,
    string
  >;
  declare hasBid: HasManyHasAssociationMixin<Awaited<ContractBid>, string>;
  declare hasBids: HasManyHasAssociationsMixin<Awaited<ContractBid>, string>;
  declare countBids: HasManyCountAssociationsMixin;
  declare createBid: HasManyCreateAssociationMixin<
    Awaited<ContractBid>,
    'contract_id'
  >;

  @HasMany(() => UserRating, 'contract_id')
  declare Ratings?: NonAttribute<Awaited<UserRating>[]>;
  declare getRatings: HasManyGetAssociationsMixin<Awaited<UserRating>>;
  declare addRating: HasManyAddAssociationMixin<Awaited<UserRating>, string>;
  declare addRatings: HasManyAddAssociationsMixin<Awaited<UserRating>, string>;
  declare setRatings: HasManySetAssociationsMixin<Awaited<UserRating>, string>;
  declare removeRating: HasManyRemoveAssociationMixin<
    Awaited<UserRating>,
    string
  >;
  declare removeRatings: HasManyRemoveAssociationsMixin<
    Awaited<UserRating>,
    string
  >;
  declare hasRating: HasManyHasAssociationMixin<Awaited<UserRating>, string>;
  declare hasRatings: HasManyHasAssociationsMixin<Awaited<UserRating>, string>;
  declare countRatings: HasManyCountAssociationsMixin;
  declare createRating: HasManyCreateAssociationMixin<
    Awaited<UserRating>,
    'contract_id'
  >;

  @BelongsToMany(() => Location, {
    through: () => ContractLocation,
    uniqueKey: 'contract_id',
  })
  declare Locations?: NonAttribute<Awaited<Location>[]>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
