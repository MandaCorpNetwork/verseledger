import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { EntityBase } from "../entitybase.entity";

import { Organization } from "./organization.entity";

@Entity()
export class OrganizationRank extends EntityBase {
  @Column()
  org_id!: string;

  @Column()
  rank_name!: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "org_id" })
  Org?: Organization;
}
