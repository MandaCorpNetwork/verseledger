// Legacy/server/src/v1/models/contract/contract_locations.model.ts
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { Contract } from "../contracts/contract.entity";
import { EntityBase } from "../entitybase.entity";

import { Location } from "./location.entity";

@Entity()
export class ContractLocation extends EntityBase {
  /* ------------------------------------------------------------------
     Core columns
     ------------------------------------------------------------------ */
  @Column({ type: "varchar", length: 32 })
  tag!: string;

  @Column({ type: "varchar", length: 36 })
  contract_id!: string;

  @Column({ type: "varchar", length: 36 })
  location_id!: string;

  /* ------------------------------------------------------------------
     Relations (used as the join‑table for Location ↔ Contract)
     ------------------------------------------------------------------ */
  @ManyToOne(() => Contract, (contract) => contract.Locations)
  @JoinColumn({ name: "contract_id" })
  Contract?: Contract;

  @ManyToOne(() => Location, (location) => location.Contracts)
  @JoinColumn({ name: "location_id" })
  Location?: Location;
}
