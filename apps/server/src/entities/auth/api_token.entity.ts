import { createId } from "@paralleldrive/cuid2";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ApiPermission } from "vl-shared/src/enum/ApiPermission";

import { EntityBase } from "#/entities/entitybase.entity";
import { User } from "#/entities/user/user.entity";

@Entity()
export class ApiToken extends EntityBase {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;
  declare user_id: string;

  @BeforeInsert()
  generateId(): void {
    this.id ??= createId();
    this.token_id ??= createId();
  }

  @Column()
  token_id: string;

  @Column()
  type: "access" | "refresh" | "api";

  @Column({ length: 32, default: "USER TOKEN" })
  name: string;

  @Column("json")
  roles: ApiPermission[];

  @Column("datetime")
  expiresAt: Date;
}
