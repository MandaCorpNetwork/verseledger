import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";

import { Location } from "./entities/location.entity";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";

@Module({
  imports: [TypeOrmModule.forFeature([Location]), AuthModule],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
