import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { IContractBidStatus } from "#/shared/schemas/contracts/ContractBidStatusSchema";

import { EntityBase } from "../entitybase.entity";
import { User } from "../user/user.entity";

import { Contract } from "./contract.entity";

@Entity()
export class ContractBid extends EntityBase {
  @Column()
  contract_id!: string;

  @Column()
  user_id!: string;

  @Column({ type: "double precision" })
  amount!: number;

  @Column()
  status!: IContractBidStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  User?: User;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: "contract_id" })
  Contract?: Contract;
}
