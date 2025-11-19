import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OpenFeatureModule, InMemoryProvider } from "@openfeature/nestjs-sdk";

import appConfig from "#/config/app.config";
import databaseConfig from "#/config/database.config";
import loginConfig from "#/config/login.config";
import { AuthModule } from "#/modules/auth/auth.module";
import { ApiToken } from "#/modules/auth/entities/api_token.entity";
import { UserAuth } from "#/modules/auth/entities/user_auth.entity";
import { Contract } from "#/modules/contract/entities/contract.entity";
import { ContractBid } from "#/modules/contract/entities/contract_bid.entity";
import { ContractLocation } from "#/modules/location/entities/contract_location.entity";
import { Location } from "#/modules/location/entities/location.entity";
import { LocationModule } from "#/modules/location/location.module";
import { Organization } from "#/modules/org/entities/organization.entity";
import { OrganizationInvite } from "#/modules/org/entities/organization_invite.entity";
import { OrganizationMember } from "#/modules/org/entities/organization_member.entity";
import { OrganizationRank } from "#/modules/org/entities/organization_rank.entity";
import { User } from "#/modules/user/entities/user.entity";
import { UserRating } from "#/modules/user/entities/user_rating.entity";
import { UserSetting } from "#/modules/user/entities/user_setting.entity";
import { UserSettingModule } from "#/modules/user_setting/user_setting.module";

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
    OpenFeatureModule.forRoot({
      defaultProvider: new InMemoryProvider(),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    LocationModule,
    UserSettingModule,
  ],
})
export class AppModule {}
