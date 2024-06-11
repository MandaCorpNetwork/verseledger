import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';
export class ContractLocation extends Model {
@Table({ tableName: 'contract_locations', timestamps: true })
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare contract_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare location_id: string;
}