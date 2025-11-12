import { ApiHideProperty } from "@nestjs/swagger";
import { createId } from "@paralleldrive/cuid2";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { EntityBase } from "#/modules/entitybase.entity";
import { User } from "#/modules/user/entities/user.entity";
import { ApiPermission } from "#/shared/schemas/ApiPermission";
import { ApiTokenType } from "#/shared/schemas/ApiTokenType";

@Entity()
export class ApiToken extends EntityBase {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  @ApiHideProperty()
  user: User;
  declare user_id: string;

  @BeforeInsert()
  generateId(): void {
    super.generateId();
    this.token_id ??= createId();
  }

  @PrimaryColumn()
  token_id: string;

  @Column()
  type: ApiTokenType;

  @Column({ length: 32, default: "USER TOKEN" })
  name: string;

  @Column("json")
  roles: ApiPermission[];

  @Column("datetime")
  expiresAt: Date;
}
