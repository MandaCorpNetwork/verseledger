import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { EntityBase } from "#/modules/entitybase.entity";
import { User } from "#/modules/user/entities/user.entity";
import { IOrganizationInviteStatus } from "#/shared/schemas/orgs/OrganizationInviteSchema";

import { Organization } from "./organization.entity";

@Entity()
export class OrganizationInvite extends EntityBase {
  @Column()
  organization_id!: string;

  @Column()
  user_id!: string;

  @Column()
  application_handler!: string;

  @Column()
  status!: IOrganizationInviteStatus;

  @Column({ type: "text", nullable: true })
  application_message?: string;

  @Column({ type: "text", nullable: true })
  application_response?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  User?: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "application_handler" })
  Handler?: User;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "organization_id" })
  Organization?: Organization;
}
