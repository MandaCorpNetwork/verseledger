import chalk from 'chalk';
import { _getCallerFile } from './getCallerFile';
export class Logger {
  private static getTimestamp() {
    return chalk.bgGrey(`[${new Date(Date.now()).toISOString()}]`);
  }
  public static info(...args: Parameters<(typeof console)['info']>) {
    const prefix = `[${_getCallerFile(2)}]`;
    console.info(
      this.getTimestamp(),
      chalk.white.bgBlue.bold('[INFO]'),
      chalk.grey(prefix),
      ...args,
    );
  }
  public static error(...args: Parameters<(typeof console)['error']>) {
    const prefix = `[${_getCallerFile(2)}]`;
    console.error(
      this.getTimestamp(),
      chalk.black.bgRedBright('[ERROR]'),
      chalk.grey(prefix),
      ...args,
    );
  }
  public static warn(...args: Parameters<(typeof console)['warn']>) {
    const prefix = `[${_getCallerFile(2)}]`;
    console.warn(
      this.getTimestamp(),
      chalk.white.bgYellow('[WARN]'),
      chalk.grey(prefix),
      ...args,
    );
  }
  public static count(...args: Parameters<(typeof console)['count']>) {
    console.count(...args);
  }
}
