import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserSetting } from "#/modules/user/entities/user_setting.entity";

import { AuthModule } from "../auth/auth.module";

import { UserSettingController } from "./user_setting.controller";
import { UserSettingService } from "./user_setting.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserSetting]), AuthModule],
  controllers: [UserSettingController],
  providers: [UserSettingService],
  exports: [],
})
export class UserSettingModule {}
