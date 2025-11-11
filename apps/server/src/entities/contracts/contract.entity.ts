import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Check,
} from "typeorm";

import { IContractPayStructure } from "#/shared/schemas/contracts/ContractPayStructureSchema";
import { IContractStatus } from "#/shared/schemas/contracts/ContractStatusSchema";
import { IContractSubType } from "#/shared/schemas/contracts/ContractSubTypeSchema";

import { EntityBase } from "../entitybase.entity";
import { Location } from "../locations/location.entity";
import { Organization } from "../orgs/organization.entity";
import { User } from "../user/user.entity";
import { UserRating } from "../user/user_rating.entity";

import { ContractBid } from "./contract_bid.entity";

@Entity()
@Check(`"ratingLimit" >= 0`)
export class Contract extends EntityBase {
  @Column({ type: "varchar", length: 32 })
  title!: string;

  @Column({ type: "varchar", length: 32 })
  subtype!: IContractSubType;

  @Column({ type: "text" })
  briefing!: string;

  get ownerType() {
    if (this.owner_org_id != null) return "organization";
    if (this.owner_user_id != null) return "user";
    throw new Error("the contract has no owner set");
  }

  get Owner() {
    switch (this.ownerType) {
      case "user":
        return this.OwnerUser;
      case "organization":
        return this.OwnerOrg;
    }
    return null;
  }

  @Column({ nullable: true })
  owner_org_id?: string;

  @Column({ nullable: true })
  owner_user_id?: string;

  @ManyToOne(() => Organization, { eager: false, nullable: true })
  @JoinColumn({ name: "owner_org_id" })
  OwnerOrg?: Organization;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: "owner_user_id" })
  OwnerUser?: User;

  @Column({ type: "datetime", nullable: true })
  bidDate?: Date;

  @Column({ type: "datetime", nullable: true })
  startDate?: Date;

  @Column({ type: "datetime", nullable: true })
  endDate?: Date;

  @Column({ type: "boolean", default: false })
  isEmergency!: boolean;

  @Column({ type: "float" })
  ratingLimit!: number;

  @Column({ type: "tinyint", unsigned: true, nullable: true })
  contractorLimit?: number;

  @Column({ type: "varchar", length: 32 })
  payStructure!: IContractPayStructure;

  @Column({ type: "boolean", default: false })
  isBargaining!: boolean;

  @Column({ type: "boolean", default: false })
  isBonusPay!: boolean;

  @Column({ type: "double" })
  defaultPay!: number;

  @Column()
  status!: IContractStatus;

  @OneToMany(() => ContractBid, (bid) => bid.contract_id, {
    cascade: true,
  })
  Bids?: ContractBid[];

  @OneToMany(() => UserRating, (rating) => rating.contract_id, {
    cascade: true,
  })
  Ratings?: UserRating[];

  @ManyToMany(() => Location, (location) => location.Contracts)
  @JoinTable({
    name: "contract_locations",
    joinColumn: { name: "contract_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "location_id", referencedColumnName: "id" },
  })
  Locations?: Location[];
}
