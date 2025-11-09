import { Column, Entity } from "typeorm";
import { EntityBase } from "../entitybase.entity";
import { createId } from "@paralleldrive/cuid2";
import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";

@Entity()
export class User extends EntityBase {
  @Column({ default: createId(), length: 32 })
  @IsString()
  handle: string;

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
