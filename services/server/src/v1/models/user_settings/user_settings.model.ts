import { IdUtil } from '@/utils/IdUtil';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ tableName: 'user_settings', timestamps: true })
export class UserSettings extends Model {
  @Column({ type: DataType.VIRTUAL })
  get __type(): 'UserSettings' {
    return 'UserSettings';
  }
  @PrimaryKey
  @Default(IdUtil.generateSettingsID)
  @Column({ type: DataType.STRING(IdUtil.IdLength + 128) })
  declare id: string;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({ type: DataType.STRING(128) })
  declare key: string;

  @Column({ type: DataType.STRING(255) })
  declare value: string;

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: Awaited<User>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
