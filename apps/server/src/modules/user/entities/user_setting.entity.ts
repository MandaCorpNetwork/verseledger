import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { EntityBase } from "#/modules/entitybase.entity";
import { User } from "#/modules/user/entities/user.entity";

@Entity()
export class UserSetting extends EntityBase {
  @Column({
    name: "user_id",
  })
  user_id!: string;

  @Column({
    type: "varchar",
    length: 128,
  })
  key!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  value!: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "user_id" })
  User!: User;
}
