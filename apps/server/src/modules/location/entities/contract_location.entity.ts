import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { EntityBase } from "#/modules/entitybase.entity";

import { Contract } from "../../contract/entities/contract.entity";

import { Location } from "./location.entity";

@Entity()
export class ContractLocation extends EntityBase {
  @Column()
  tag!: string;

  @Column()
  contract_id!: string;

  @Column()
  location_id!: string;

  @ManyToOne(() => Contract, (contract) => contract.Locations)
  @JoinColumn({ name: "contract_id" })
  Contract?: Contract;

  @ManyToOne(() => Location, (location) => location.Contracts)
  @JoinColumn({ name: "location_id" })
  Location?: Location;
}
