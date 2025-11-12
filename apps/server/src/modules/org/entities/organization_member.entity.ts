import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { EntityBase } from "#/modules/entitybase.entity";
import { User } from "#/modules/user/entities/user.entity";

import { Organization } from "./organization.entity";
import { OrganizationRank } from "./organization_rank.entity";

@Entity()
export class OrganizationMember extends EntityBase {
  @Column()
  user_id!: string;

  @Column()
  org_id!: string;

  @Column()
  rank_id!: string;

  @Column({ type: "datetime", nullable: true })
  joined?: Date;

  @Column({ type: "boolean", default: false })
  primary!: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  User?: User;

  @ManyToOne(() => OrganizationRank)
  @JoinColumn({ name: "rank_id" })
  Rank?: OrganizationRank;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "org_id" })
  Org?: Organization;
}
