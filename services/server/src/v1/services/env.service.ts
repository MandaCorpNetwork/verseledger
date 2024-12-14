import { injectable } from 'inversify';
import 'dotenv/config';
import colors from 'colors/safe';
import { envConfig, type EnvironmentConfig } from '@Configs/Environment';
import { Logger } from '@Utils/Logger';
let has_warned = false;
@injectable()
export class EnvService implements EnvironmentConfig {
  // ENVARS HERE
  declare DISCORD_CLIENT_ID: string;
  declare DISCORD_CLIENT_SECRET: string;

  declare GOOGLE_CLIENT_ID: string;
  declare GOOGLE_CLIENT_SECRET: string;

  declare FRONTEND_HOST: string;
  declare BACKEND_HOST: string;
  declare BROKER_HOST: string;

  declare PALLY_WS: string;
  declare PALLY_CHANNEL: string;

  declare VAPID_PUBLIC_KEY: string;
  declare VAPID_PRIVATE_KEY: string;
  declare VAPID_SUBJECT: string;

  declare MYSQL_DATABASE: string;
  declare MYSQL_USER: string;
  declare MYSQL_PASSWORD: string;
  declare MYSQL_HOST: string;
  declare MYSQL_PORT: number;

  declare EXPRESS_PORT: number;

  declare AUTH_SECRET: string;
  // SERVICE CODE
  constructor() {
    const env = process.env;
    this.errorStack = [];
    this.warnStack = [];
    for (const tempProp in envConfig) {
      const prop = tempProp as keyof typeof envConfig;
      const type = envConfig[prop].type;
      const optional = envConfig[prop].optional;
      const defaultValue = envConfig[prop].default;
      const description = envConfig[prop].description as string;
      let envar = env[prop] as string;
      if (envar == undefined) {
        if (optional) {
          this.warnStack.push(
            `${`${colors.green('"')}${colors.bold(colors.cyan(prop))}=${colors.underline(type)}${colors.green('"')}`}${colors.gray(` is missing.`)}`,
          );
          this.warnStack.push(
            `${colors.gray(`${colors.yellow('-')} Defaulting to`)}${`${colors.green('"')}${colors.yellow(defaultValue as unknown as string)}${colors.green('"')}`}`,
          );
          this.warnStack.push('');
          envar = defaultValue as unknown as string;
        } else {
          this.errorStack.push(
            `${colors.green('"')}${colors.cyan(colors.bold(prop))}=${colors.underline(type)}${colors.green('"')}${colors.red(' is missing.')}`,
          );
          this.errorStack.push(
            `${colors.yellow('-')} ${colors.gray(description)}`,
          );
          this.errorStack.push('');
          continue;
        }
      }
      switch (type) {
        case 'string': {
          this[prop] = envar as never;
          break;
        }
        case 'number': {
          this[prop] = Number.parseFloat(envar) as never;
          break;
        }
      }
    }
    if (has_warned) return;
    Logger.init();
    has_warned = true;
    if (this.warnStack.length > 0) {
      for (const warn of this.warnStack) {
        Logger.warn(warn);
      }
    }
    if (this.errorStack.length > 0) {
      for (const error of this.errorStack) {
        Logger.error(error);
      }
      process.exit(1);
    }
  }
  private readonly errorStack: string[];
  private readonly warnStack: string[];
}
