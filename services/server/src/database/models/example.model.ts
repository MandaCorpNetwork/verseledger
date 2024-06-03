import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'example', timestamps: true })
export class Example extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER({ unsigned: true }))
  declare id: number;

  @Column(DataType.TEXT())
  declare value: string;
}
