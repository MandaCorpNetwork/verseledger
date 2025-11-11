import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

import { EntityBase } from "../entitybase.entity";
import { User } from "../user/user.entity";

import { OrganizationInvite } from "./organization_invite.entity";
import { OrganizationMember } from "./organization_member.entity";
import { OrganizationRank } from "./organization_rank.entity";

@Entity()
export class Organization extends EntityBase {
  @Column()
  owner_id!: string;

  @Column()
  title!: string;

  @Column()
  rsi_handle!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "owner_id" })
  Owner?: User;

  @OneToMany(() => OrganizationMember, (member) => member.Org)
  Members?: OrganizationMember[];

  @OneToMany(() => OrganizationRank, (rank) => rank.Org)
  Ranks?: OrganizationRank[];

  @OneToMany(() => OrganizationInvite, (invite) => invite.organization_id)
  Invites?: OrganizationInvite[];
}
