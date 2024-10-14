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
import { Contract } from '@V1/models/contract/contract.model';
import { User } from '@V1/models/user/user.model';
import { IdUtil } from '@Utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { IContractBidStatus } from 'vl-shared/src/schemas/ContractBidStatusSchema';

@Scopes(() => ({
  user: {
    include: [{ model: User, as: 'User' }],
  },
  contract: {
    include: [{ model: Contract, as: 'Contract' }],
  },
}))
@Table({ tableName: 'contract_bids', timestamps: true })
export class ContractBid extends Model<
  InferAttributes<ContractBid>,
  InferCreationAttributes<ContractBid>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'ContractBid'> {
    return 'ContractBid';
  }
  @PrimaryKey
  @Default(IdUtil.generateBidID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare contract_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({ type: DataType.DOUBLE() })
  declare amount: number;

  @Column({
    type: DataType.ENUM(
      'PENDING',
      'ACCEPTED',
      'REJECTED',
      'INVITED',
      'DECLINED',
      'EXPIRED',
      'DISMISSED',
      'WITHDRAWN',
    ),
  })
  declare status: IContractBidStatus;

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: CreationOptional<Awaited<User>>;

  @BelongsTo(() => Contract, { foreignKey: 'contract_id', targetKey: 'id' })
  declare Contract: CreationOptional<Awaited<Contract>>;
}
