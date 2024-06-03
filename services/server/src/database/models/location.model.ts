import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';

@Table({ tableName: 'locations', timestamps: true })
export class Location extends Model {
  @PrimaryKey
  @Default(IdUtil.generateLocationID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: string;

  @Column({ type: DataType.STRING(128) })
  declare version: string;

  @Column({ type: DataType.STRING(64) })
  declare name: string;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare parent: string;

  @Column({ type: DataType.STRING(64) })
  declare category: string;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare short_name: string;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare waypoint_name: string | null;

  @AllowNull
  @Column({ type: DataType.STRING(64) })
  declare time_index: string | null;

  @Column({ type: DataType.DOUBLE })
  declare x: number;

  @Column({ type: DataType.DOUBLE })
  declare y: number;

  @Column({ type: DataType.DOUBLE })
  declare z: number;

  @Column({ type: DataType.BOOLEAN })
  declare QT: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
