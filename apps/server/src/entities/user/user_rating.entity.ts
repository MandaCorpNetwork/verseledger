import { Entity, Column, ManyToOne, JoinColumn, Check } from "typeorm";

import { IRatingType } from "#/shared/schemas/UserRatingsSchema";

import { Contract } from "../contracts/contract.entity";
import { EntityBase } from "../entitybase.entity";

import { User } from "./user.entity";

@Entity()
@Check(`"rating_value" >= 1 AND "rating_value" <= 5`)
export class UserRating extends EntityBase {
  @Column()
  submitter_id!: string;

  @Column()
  reciever_id!: string;

  @Column()
  contract_id!: string;

  @Column()
  rating_type!: IRatingType;

  @Column("int")
  rating_value!: number;

  @Column({
    type: "text",
    nullable: true,
  })
  comment?: string | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: "submitter_id" })
  Submitter!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "reciever_id" })
  Reciever!: User;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: "contract_id" })
  Contract!: Contract;
}
