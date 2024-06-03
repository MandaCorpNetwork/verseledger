import { injectable } from 'inversify';
import 'dotenv/config';
import colors from 'colors/safe';
import { envConfig, EnvironmentConfig } from '@/configs/Environment';
let has_warned = false;
@injectable()
export class EnvService implements EnvironmentConfig {
  // ENVARS HERE
  public DISCORD_CLIENT_ID!: string;
  public DISCORD_CLIENT_SECRET!: string;

  public MYSQL_DATABASE!: string;
  public MYSQL_USER!: string;
  public MYSQL_PASSWORD!: string;
  public MYSQL_HOST!: string;
  public MYSQL_PORT!: number;

  public EXPRESS_PORT!: number;
  // SERVICE CODE
  constructor() {
    const env = process.env;
    this.errorStack = [];
    this.warnStack = [];
    for (const tempProp in envConfig) {
      const prop = tempProp as keyof typeof envConfig;
      const type = envConfig[prop].type as 'string' | 'number';
      const optional = envConfig[prop].optional;
      const defaultValue = envConfig[prop].default;
      const description = envConfig[prop].description as string;
      let envar = env[prop] as string;
      if (envar == undefined) {
        if (optional) {
          this.warnStack.push(
            `${colors.magenta('[ENV]')}${`${colors.green('"')}${colors.bold(colors.cyan(prop))}=${colors.underline(type)}${colors.green('"')}`}${colors.gray(`is missing.\n ${colors.yellow('-')} Defaulting to`)}${`${colors.green('"')}${colors.yellow(defaultValue as unknown as string)}${colors.green('"')}\n`}`,
          );
          envar = defaultValue as unknown as string;
        } else {
          this.errorStack.push(
            `${colors.red(`[ENV] `)}${colors.green('"')}${colors.cyan(colors.bold(prop))}=${colors.underline(type)}${colors.green('"')}${colors.red(' is missing.')}\n ${colors.yellow('-')} ${colors.gray(description)}\n`,
          );
          continue;
        }
      }
      switch (type) {
        case 'string': {
          this[prop] = envar as never;
          break;
        }
        case 'number': {
          this[prop] = parseFloat(envar as string) as never;
          break;
        }
      }
    }
    if (has_warned) return;
    has_warned = true;
    if (this.warnStack.length > 0) {
      for (const warn of this.warnStack) {
        console.info(warn);
      }
    }
    if (this.errorStack.length > 0) {
      for (const error of this.errorStack) {
        console.error(error);
      }
      process.exit(1);
    }
  }
  private errorStack: string[];
  private warnStack: string[];
}
