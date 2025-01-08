import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  BelongsTo,
  Default,
  AllowNull,
} from 'sequelize-typescript';

import { User } from '@V1/models/user/user.model';
import { IdUtil } from '@Utils/IdUtil';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { PushSubscription } from 'web-push';

@Table({ tableName: 'organizations', timestamps: true })
export class Subscription extends Model<
  InferAttributes<Subscription>,
  InferCreationAttributes<Subscription>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'Subscription'> {
    return 'Subscription';
  }

  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare user_id: string;

  @Column({ type: DataType.STRING(255) })
  declare endpoint: string;

  @Column({ type: DataType.STRING(255) })
  declare auth: string;

  @Column({ type: DataType.STRING(255) })
  declare p256dh: string;

  @AllowNull
  @Column({ type: DataType.NUMBER() })
  declare expiration_time: CreationOptional<number>;

  @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'id' })
  declare User: CreationOptional<Awaited<User>>;

  public getPushSubscription(): PushSubscription {
    const endpoint = this.getDataValue('endpoint');
    const auth = this.getDataValue('auth');
    const p256dh = this.getDataValue('p256dh');
    const expirationTime = this.getDataValue('expiration_time');

    return { endpoint, keys: { auth, p256dh }, expirationTime };
  }

  public static format(sub: PushSubscription) {
    return {
      endpoint: sub.endpoint,
      auth: sub.keys.auth,
      p256dh: sub.keys.p256dh,
      expiration_time: sub.expirationTime as number | undefined,
    };
  }
}
