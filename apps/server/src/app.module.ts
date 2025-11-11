import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import appConfig from "#/config/app.config";
import databaseConfig from "#/config/database.config";
import loginConfig from "#/config/login.config";
import { ApiToken } from "#/entities/auth/api_token.entity";
import { UserAuth } from "#/entities/auth/user_auth.entity";
import { User } from "#/entities/user/user.entity";
import { UserRating } from "#/entities/user/user_rating.entity";
import { UserSetting } from "#/entities/user/user_setting.entity";
import { AuthModule } from "#/modules/auth/auth.module";

import { Contract } from "./entities/contracts/contract.entity";
import { ContractBid } from "./entities/contracts/contract_bid.entity";
import { ContractLocation } from "./entities/locations/contract_location.entity";
import { Location } from "./entities/locations/location.entity";
import { Organization } from "./entities/orgs/organization.entity";
import { OrganizationInvite } from "./entities/orgs/organization_invite.entity";
import { OrganizationMember } from "./entities/orgs/organization_member.entity";
import { OrganizationRank } from "./entities/orgs/organization_rank.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      cache: true,
      isGlobal: true,
      load: [appConfig, databaseConfig, loginConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<"sqlite">("database.type"),
        database: configService.get<string>("database.database"),
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        synchronize: process.env["NODE_ENV"] !== "production",
        entities: [
          ApiToken,
          UserAuth,
          ContractBid,
          Contract,
          ContractLocation,
          Location,
          OrganizationInvite,
          OrganizationMember,
          OrganizationRank,
          Organization,
          UserRating,
          UserSetting,
          User,
        ],
        logger: "advanced-console",
        // logging: [
        //   "error",
        //   "info",
        //   "log",
        //   "migration",
        //   "query",
        //   "schema",
        //   "warn",
        // ],
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
  ],
})
export class AppModule {}
