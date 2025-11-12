import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserSetting } from "#/modules/user/entities/user_setting.entity";

import { UserSettingService } from "./user_setting.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserSetting])],
  controllers: [],
  providers: [UserSettingService],
  exports: [],
})
export class UserSettingModule {}
