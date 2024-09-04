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

@Table({ tableName: 'notifications', timestamps: true })
export class Notification extends Model<
  InferAttributes<Notification>,
  InferCreationAttributes<Notification>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'Notification'> {
    return 'Notification';
  }
  @PrimaryKey
  @Default(IdUtil.generateNotificationID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly user_id: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare read: CreationOptional<boolean>;

  @Column({ type: DataType.TEXT() })
  declare readonly text: string;

  @Column({ type: DataType.TEXT() })
  declare readonly resource: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}
