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
import { User } from './user.model';
import { IdUtil } from '@/utils/IdUtil';

@Scopes(() => ({
  user: {
    include: [{ model: User, as: 'User' }],
  },
  contract: {
    include: [{ model: Contract, as: 'Contract' }],
  },
}))
@Table({ tableName: 'contract_bids', timestamps: true })
export class ContractBid extends Model {
  @Column({ type: DataType.VIRTUAL })
  get __type(): 'ContractBid' {
    return 'ContractBid';
  }
  @PrimaryKey
  @Default(IdUtil.generateBidID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare contract_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({
    type: DataType.ENUM(
      'PENDING',
      'ACCEPTED',
      'REJECTED',
      'INVITED',
      'DECLINED',
      'EXPIRED',
    ),
  })
  declare status:
    | 'PENDING'
    | 'ACCEPTED'
    | 'REJECTED'
    | 'INVITED'
    | 'DECLINED'
    | 'EXPIRED';

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: Awaited<User>;

  @BelongsTo(() => Contract, { foreignKey: 'contract_id', targetKey: 'id' })
  declare Contract: Awaited<Contract>;
}
