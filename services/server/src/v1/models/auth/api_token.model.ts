import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({ tableName: 'api_tokens', timestamps: true })
export class ApiToken extends Model<
  InferAttributes<ApiToken>,
  InferCreationAttributes<ApiToken>
> {
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @PrimaryKey
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare token_id: string;

  @Column({ type: DataType.ENUM('access', 'refresh', 'api') })
  declare type: 'access' | 'refresh' | 'api';

  @Default('USER TOKEN')
  @Column({ type: DataType.STRING(32) })
  declare name: CreationOptional<string>;

  @Column({ type: DataType.DATE })
  declare expiresAt: CreationOptional<Date>;
}
