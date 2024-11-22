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

@Table({ tableName: 'organization_role', timestamps: true })
export class OrganizationRole extends Model<
  InferAttributes<OrganizationRole>,
  InferCreationAttributes<OrganizationRole>
> {
  @Column({ type: DataType.VIRTUAL })
  get __type(): CreationOptional<'OrganizationRole'> {
    return 'OrganizationRole';
  }
  @PrimaryKey
  @Default(IdUtil.generateSystemID)
  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING(IdUtil.IdLength) })
  declare org_id: Awaited<Organization['id']>;

  @Column({ type: DataType.STRING(32) })
  declare role_name: string;

  @BelongsTo(() => Organization, { foreignKey: 'org_id', targetKey: 'id' })
  declare Org: CreationOptional<Awaited<Organization>>;
}
