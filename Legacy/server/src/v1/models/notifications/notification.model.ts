import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@Utils/IdUtil';
import type {
  CreationOptional,
  ForeignKey as ForeignKeyProp,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import { User } from '@V1/models/user/user.model';

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

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare readonly user_id: ForeignKeyProp<string>;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare read: CreationOptional<boolean>;

  @Column({ type: DataType.TEXT() })
  declare readonly message: string;

  @AllowNull
  @Column({ type: DataType.JSON() })
  declare readonly action: CreationOptional<string | null>;

  @BelongsTo(() => User)
  declare readonly User: NonAttribute<Awaited<User>>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}
