import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';
@Table({ tableName: 'user_validation', timestamps: true })
export class UserValidation extends Model {
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({ type: DataType.STRING(32) })
  declare handle: string;

  @Column({ type: DataType.TEXT() })
  declare pfp: string;

  @Default(() => new Date(Date.now() + 1000 * 60 * 10))
  @Column({ type: DataType.DATE })
  declare readonly expiresAt: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
