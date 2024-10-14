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
import { User } from '@V1/models/user/user.model';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({ tableName: 'user_settings', timestamps: true })
export class UserSettings extends Model<
  InferAttributes<UserSettings>,
  InferCreationAttributes<UserSettings>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'UserSettings'> {
    return 'UserSettings';
  }
  @PrimaryKey
  @Default(IdUtil.generateSettingsID)
  @Column({ type: DataType.STRING(IdUtil.IdLength + 128) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({ type: DataType.STRING(128) })
  declare key: string;

  @Column({ type: DataType.STRING(255) })
  declare value: string;

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: CreationOptional<Awaited<User>>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}
