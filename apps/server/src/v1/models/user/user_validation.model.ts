import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@Utils/IdUtil';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
@Table({ tableName: 'user_validation', timestamps: true })
export class UserValidation extends Model<
  InferAttributes<UserValidation>,
  InferCreationAttributes<UserValidation>
> {
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({ type: DataType.STRING(32) })
  declare handle: string;

  @Column({ type: DataType.TEXT() })
  declare pfp: string;

  @Default(() => new Date(Date.now() + 1000 * 60 * 10))
  @Column({ type: DataType.DATE })
  declare readonly expiresAt: CreationOptional<Date>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}
