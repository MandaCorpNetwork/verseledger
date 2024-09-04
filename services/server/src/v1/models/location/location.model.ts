import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';
import { ContractLocation } from '@V1/models/contract/contract_locations.model';
import { Contract } from '@V1/models/contract/contract.model';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({ tableName: 'locations', timestamps: true })
export class Location extends Model<
  InferAttributes<Location>,
  InferCreationAttributes<Location>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'Location'> {
    return 'Location';
  }
  @PrimaryKey
  @Default(IdUtil.generateLocationID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: CreationOptional<string>;

  @Column({ type: DataType.STRING(128) })
  declare version: string;

  @Column({ type: DataType.STRING(64) })
  declare name: string;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare parent: CreationOptional<string>;

  @Column({ type: DataType.STRING(64) })
  declare category: string;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare short_name: CreationOptional<string>;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare waypoint_name: CreationOptional<string | null>;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare time_index: CreationOptional<string | null>;

  @Column({ type: DataType.DOUBLE })
  declare x: number;

  @Column({ type: DataType.DOUBLE })
  declare y: number;

  @Column({ type: DataType.DOUBLE })
  declare z: number;

  @Column({ type: DataType.BOOLEAN })
  declare QT: boolean;

  @BelongsToMany(() => Contract, {
    through: () => ContractLocation,
    uniqueKey: 'location_id',
  })
  declare Contracts: CreationOptional<Contract[]>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}
