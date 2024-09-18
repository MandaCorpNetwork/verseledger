import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IdUtil } from '@/utils/IdUtil';
import {
  BelongsToGetAssociationMixin,
  CreationOptional,
  ForeignKey as ForeignKeyType,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import { User } from '../user/user.model';

@Table({ tableName: 'user_auth', timestamps: true })
export class UserAuth extends Model<
  InferAttributes<UserAuth>,
  InferCreationAttributes<UserAuth>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER({ unsigned: true }) })
  declare id: CreationOptional<ForeignKeyType<number>>;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: ForeignKeyType<string>;

  @Column({ type: DataType.ENUM('DISCORD', 'GOOGLE') })
  declare type: 'DISCORD' | 'GOOGLE';

  @Column({ type: DataType.STRING(32) })
  declare identifier: string;

  @BelongsTo(() => User)
  declare User?: NonAttribute<Awaited<User>>;
  declare getUser: BelongsToGetAssociationMixin<Awaited<User>>;
}
