import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { JwtAuthGuard } from "../auth/guards/awt-auth.guard";

import { UserSettingService } from "./user_setting.service";

@Controller("user-settings")
export class UserSettingController {
  constructor(private readonly userSettingService: UserSettingService) {}
  @UseGuards(JwtAuthGuard)
  @Get("/@me")
  public async getMySettings(@Req() request: Request) {
    return this.userSettingService.getUserSettings(request.token.user_id);
  }
}
