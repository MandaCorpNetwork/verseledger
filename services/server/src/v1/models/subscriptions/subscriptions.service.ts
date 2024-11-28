import { Logger } from '@Utils/Logger';
import { inject, injectable } from 'inversify';
// import webpush from 'web-push'
import { EnvService } from '@V1/services/env.service';
import { TYPES } from '@Constant/types';
import chalk from 'chalk';
@injectable()
export class SubscriptionService {
  public initialized: boolean = false;
  constructor(@inject(TYPES.EnvService) private readonly _envars: EnvService) {
    let failed = false;
    if (this._envars.VAPID_PRIVATE_KEY == null) {
      failed = true;
      Logger.warn(
        `${chalk.green('"')}${chalk.cyan.bold('VAPID_PRIVATE_KEY')}${chalk.green('"')} ${chalk.grey('envar not set.')}`,
      );
    }
    if (this._envars.VAPID_PUBLIC_KEY == null) {
      failed = true;
      Logger.warn(
        `${chalk.green('"')}${chalk.cyan.bold('VAPID_PUBLIC_KEY')}${chalk.green('"')} ${chalk.grey('envar not set.')}`,
      );
    }
    if (failed) {
      Logger.warn(chalk.red('Service not Initialized.'));
      return;
    }
    this.initialized = true;
    Logger.init();
  }
}
