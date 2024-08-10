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

import { IContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { User } from './user.model';
import { ContractBid } from './contract_bid.model';
import { IdUtil } from '@/utils/IdUtil';
import { NonAttribute } from 'sequelize';
import { Organization } from './organization.model';
import { OwnerType } from '@/utils/OwnerType';
import { Location } from './location.model';
import { ContractLocation } from './contract_locations.model';
import { IContractStatus } from 'vl-shared/src/schemas/ContractStatusSchema';
import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { UserRating } from './user_ratings.model';
@Scopes(() => ({
  bids: {
    include: [{ model: ContractBid, as: 'Bids', include: ['User'] }],
  },
  owner: { include: [{ model: User, as: 'Owner' }] },
  locations: {
    include: [{ model: Location, as: 'Locations' }],
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
  get __type(): 'Contract' {
    return 'Contract';
  }

  @PrimaryKey
  @Default(IdUtil.generateContractID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: string;

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
  declare owner_org_id: Awaited<User['id']>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare owner_user_id: Awaited<User['id']>;

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
    type: DataType.ENUM('BIDDING', 'INPROGRESS', 'COMPLETED', 'CANCELLED'),
  })
  declare status: IContractStatus;

  @BelongsTo(() => User, { foreignKey: 'owner_user_id', targetKey: 'id' })
  declare Owner: Awaited<User>;

  @HasMany(() => ContractBid, 'contract_id')
  declare Bids: Awaited<ContractBid>[];

  @HasMany(() => UserRating, 'rating_id')
  declare Ratings: Awaited<UserRating>[];

  @BelongsToMany(() => Location, {
    through: () => ContractLocation,
    uniqueKey: 'contract_id',
  })
  declare Locations: Awaited<Location>[];

  declare createdAt: Date;
  declare updatedAt: Date;
}
