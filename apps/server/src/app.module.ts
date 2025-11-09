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
import { AuthModule } from "#/modules/auth/auth.module";

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
        entities: [User, ApiToken, UserAuth, UserRating],
        synchronize: process.env["NODE_ENV"] !== "production",
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
  ],
})
export class AppModule {}
