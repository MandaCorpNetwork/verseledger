import { IdUtil } from '@Utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

@Table({ tableName: 'feature_flags', timestamps: true })
export class FeatureFlag
  extends Model<
    InferAttributes<FeatureFlag>,
    InferCreationAttributes<FeatureFlag>
  >
  implements IFeatureFlag
{
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(32) })
  declare name: string;

  @Default('')
  @Column({ type: DataType.TEXT()})
  declare description: string;

  @Column({ type: DataType.BOOLEAN() })
  declare enabled: boolean;

  @AllowNull
  @Column({ type: DataType.FLOAT() })
  declare percentageOfUsers: CreationOptional<number | null | undefined>;

  @AllowNull
  @Column({ type: DataType.STRING(128) })
  declare settingName: CreationOptional<string | null | undefined>;

  @AllowNull
  @Column({ type: DataType.STRING(255) })
  declare settingValue: CreationOptional<string | null | undefined>;
}
