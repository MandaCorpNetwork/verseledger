import { createId } from "@paralleldrive/cuid2";
import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";
import { Column, Entity, BeforeInsert } from "typeorm";

import { EntityBase } from "#/modules/entitybase.entity";

@Entity()
export class User extends EntityBase {
  @Column({ length: 32 })
  @IsString()
  handle: string;

  @BeforeInsert()
  generateId() {
    super.generateId();
    this.handle ??= createId();
  }

  @Column({ length: 32 })
  @IsString()
  desplayName: string;

  @Column("int", { default: 0 })
  @IsInt()
  total_ratings: number;

  @Column("double", { default: -1 })
  @IsNumber()
  display_rating: number;

  @Column("double", { default: -1 })
  @IsNumber()
  weighted_rating: number;

  @Column("text", {
    default:
      "https://cdn.robertsspaceindustries.com/static/spectrum/images/member-avatar-default.jpg",
  })
  @IsString()
  pfp: string;

  @Column("boolean", { default: false })
  @IsBoolean()
  verified: boolean;

  @Column("datetime", { default: Date.now() })
  last_login: Date;
}
