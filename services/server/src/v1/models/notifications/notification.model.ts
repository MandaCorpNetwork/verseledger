import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';

@Table({ tableName: 'notifications', timestamps: true })
export class Notification extends Model {
  @Column({ type: DataType.VIRTUAL })
  get __type(): 'Notification' {
    return 'Notification';
  }
  @PrimaryKey
  @Default(IdUtil.generateNotificationID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly user_id: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare read: boolean;

  @Column({ type: DataType.TEXT() })
  declare readonly text: string;

  @Column({ type: DataType.TEXT() })
  declare readonly resource: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
