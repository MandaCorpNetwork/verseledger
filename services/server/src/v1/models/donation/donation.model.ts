import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  Default,
  AllowNull,
} from 'sequelize-typescript';

import { IdUtil } from '@Utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
@Table({ tableName: 'donations', timestamps: true })
export class Donation extends Model<
  InferAttributes<Donation>,
  InferCreationAttributes<Donation>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'Donation'> {
    return 'Donation';
  }

  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(128) })
  declare display_name: string;

  @Column({ type: DataType.STRING(128) })
  declare donation_id: string;

  @Column({ type: DataType.INTEGER() })
  declare cents: number;

  @AllowNull
  @Column({ type: DataType.TEXT() })
  declare message?: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
