import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';
import { Contract } from './contract.model';
import { Location } from '@V1/models/location/location.model';
import {
  CreationOptional,
  ForeignKey as ForeignKeyType,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({ tableName: 'contract_locations', timestamps: true })
export class ContractLocation extends Model<
  InferAttributes<ContractLocation>,
  InferCreationAttributes<ContractLocation>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'ContractLocation'> {
    return 'ContractLocation';
  }

  @Column({ type: DataType.STRING(32) })
  declare tag: string;

  @ForeignKey(() => Contract)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare contract_id: ForeignKeyType<string>;

  @ForeignKey(() => Location)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare location_id: ForeignKeyType<string>;
}
