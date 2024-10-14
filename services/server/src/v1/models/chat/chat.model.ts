import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  Default,
} from 'sequelize-typescript';

import { IdUtil } from '@Utils/IdUtil';
import { CreationOptional, ForeignKey as ForeignKeyType } from 'sequelize';
import { IChat } from 'vl-shared/src/schemas/ChatSchema';
@Table({ tableName: 'chat', timestamps: true })
export class Chat extends Model implements IChat {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'Chat'> {
    return 'Chat';
  }

  @PrimaryKey
  @Default(IdUtil.generateChatID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare sender_id: ForeignKeyType<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare receiver_id: CreationOptional<ForeignKeyType<string>>;

  @Column({ type: DataType.TEXT() })
  declare message: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN() })
  declare read: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
