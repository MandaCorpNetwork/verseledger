import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';
import { Contract } from './contract.model';
import { Location } from './location.model';

@Table({ tableName: 'contract_locations', timestamps: true })
export class ContractLocation extends Model {
  @ForeignKey(() => Contract)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare contract_id: string;

  @ForeignKey(() => Location)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare location_id: string;
}
