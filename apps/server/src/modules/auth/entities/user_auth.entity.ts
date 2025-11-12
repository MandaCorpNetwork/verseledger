import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { EntityBase } from "#/modules/entitybase.entity";
import { User } from "#/modules/user/entities/user.entity";

@Entity()
export class UserAuth extends EntityBase {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;
  declare user_id: string;

  @Column()
  type: "DISCORD" | "GOOGLE";

  @Column({ length: 32 })
  identifier: string;
}
