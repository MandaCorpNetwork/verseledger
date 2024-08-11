import { AllowNull, BelongsTo, Column, DataType, Default, DefaultScope, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { IdUtil } from "@/utils/IdUtil";
import { IRatingType } from "vl-shared/src/schemas/UserRatingsSchema";
import { Contract } from "./contract.model";

@Scopes(() => ({
  submitter: {
    include: [{ model: User, as: 'Submitter' }]
  },
  reciever: {
    include: [{ model: User, as: 'Reciever' }]
  },
  contract: {
    include: [{ model: Contract, as: 'Contract' }]
  },
}))
@Table({ tableName: 'user_ratings', timestamps: true })
export class UserRating extends Model {
  @Column({ type: DataType.VIRTUAL })
  get __type(): 'Rating' {
    return 'Rating';
  }
  @PrimaryKey
  @Default(IdUtil.generateRatingID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare submitter_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare reciever_id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare contract_id: string;

  @Column({ type: DataType.STRING(32) })
  declare rating_type: IRatingType;

  @Column({ type: DataType.INTEGER, validate: { min: 1, max: 5 } })
  declare rating_value: number;

  @AllowNull
  @Column({ type: DataType.TEXT })
  declare comment: string;

  @BelongsTo(() => User, { foreignKey: 'submitter_id', targetKey: 'id' })
  declare Submitter: Awaited<User>;

  @BelongsTo(() => User, { foreignKey: 'reciever_id', targetKey: 'id' })
  declare Reciever: Awaited<User>;

  @BelongsTo(() => Contract, { foreignKey: 'contract_id', targetKey: 'id' })
  declare Contract: Awaited<Contract>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}