import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';

@Table({ tableName: 'invalid_tokens', timestamps: true })
export class InvalidToken extends Model {
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: number;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @PrimaryKey
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare token_id: string;

  @Column({ type: DataType.DATE })
  declare expires: Date;
}
