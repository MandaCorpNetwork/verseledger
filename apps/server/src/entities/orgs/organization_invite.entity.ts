import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { IOrganizationInviteStatus } from "#/shared/schemas/orgs/OrganizationInviteSchema";

import { EntityBase } from "../entitybase.entity";
import { User } from "../user/user.entity";

import { Organization } from "./organization.entity";

@Entity()
export class OrganizationInvite extends EntityBase {
  @Column({ type: "varchar", length: 36 })
  organization_id!: string;

  @Column({ type: "varchar", length: 36 })
  user_id!: string;

  @Column({ type: "varchar", length: 36 })
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
