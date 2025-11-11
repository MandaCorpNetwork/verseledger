import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

import { Contract } from "../contracts/contract.entity";
import { EntityBase } from "../entitybase.entity";

@Entity()
export class Location extends EntityBase {
  @Column({ type: "varchar", length: 128 })
  version!: string;

  @Column({ type: "varchar", length: 64 })
  name!: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  parent?: string;

  @Column({ type: "varchar", length: 64 })
  category!: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  short_name?: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  waypoint_name?: string | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  time_index?: string | null;

  @Column({ type: "double precision" })
  x!: number;

  @Column({ type: "double precision" })
  y!: number;

  @Column({ type: "double precision" })
  z!: number;

  @Column({ type: "boolean" })
  QT!: boolean;

  @ManyToMany(() => Contract, (contract) => contract.Locations)
  @JoinTable({
    name: "contract_location", // join table name
    joinColumn: { name: "location_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "contract_id", referencedColumnName: "id" },
  })
  Contracts?: Contract[];
}
