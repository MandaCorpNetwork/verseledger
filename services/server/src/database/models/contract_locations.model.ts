import {
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { Contract } from './contract.model';
import { Location } from './location.model';
import { IdUtil } from '@/utils/IdUtil';

@Scopes(() => ({
  location: {
    include: [{ model: Location, as: 'Location' }],
  },
  contract: {
    include: [{ model: Contract, as: 'Contract' }],
  },
}))
@Table({ tableName: 'contract_locations', timestamps: true })
export class ContractLocation extends Model {
  @PrimaryKey
  @Default(IdUtil.generateLocationID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: string;
  
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare contract_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare location_id: string;

  @BelongsTo(() => Location, { foreignKey: 'location_id', targetKey: 'id' })
  declare Location: Awaited<Location>;

  @BelongsTo(() => Contract, { foreignKey: 'contract_id', targetKey: 'id' })
  declare Contract: Awaited<Contract>;
}