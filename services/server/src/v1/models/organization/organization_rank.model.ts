import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  BelongsTo,
  Default,
} from 'sequelize-typescript';

import { Organization } from '@V1/models/organization/organization.model';
import { IdUtil } from '@Utils/IdUtil';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({ tableName: 'organization_rank', timestamps: true })
export class OrganizationRank extends Model<
  InferAttributes<OrganizationRank>,
  InferCreationAttributes<OrganizationRank>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'OrganizationRank'> {
    return 'OrganizationRank';
  }
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare org_id: Awaited<Organization['id']>;

  @Column({ type: DataType.STRING(32) })
  declare rank_name: string;

  @BelongsTo(() => Organization, { foreignKey: 'org_id', targetKey: 'id' })
  declare Org: CreationOptional<Awaited<Organization>>;
}
