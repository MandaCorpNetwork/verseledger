import { ApiHideProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { UserSettingKey } from "#/shared/enum/UserSettingKey";

import { EntityBase } from "../entitybase.entity";

import { User } from "./user.entity";

@Entity()
export class UserSetting extends EntityBase {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  @ApiHideProperty()
  user: User;
  declare user_id: string;

  @PrimaryColumn()
  @IsEnum(UserSettingKey)
  key: UserSettingKey;

  @Column()
  value: string;
}
