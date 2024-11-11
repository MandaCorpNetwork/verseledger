import { inject, injectable } from 'inversify';
import { TYPES } from '@Constant/types';
import { EnvService } from '../../services/env.service';
import { Logger } from '@Utils/Logger';
import chalk from 'chalk';
import Pally from 'pally.gg';
import { NotificationService } from '@V1/models/notifications/notification.service';
import { Donation } from './donation.model';
import { DonationToDonationDTOMapper } from './mapping/DonationToDonationDTO';

type CampaignTip = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  grossAmountInCents: number;
  netAmountInCents: number;
  processingFeeInCents: number;
  displayName: string;
  message: string;
};

@injectable()
export class PallyService {
  protected client?: (typeof Pally)['Client']['prototype'];
  protected interval?: NodeJS.Timeout;

  constructor(
    @inject(TYPES.EnvService) private readonly envars: EnvService,
    @inject(TYPES.NotificationService)
    private readonly notifications: NotificationService,
  ) {
    if (this.envars.PALLY_WS == null) {
      Logger.warn(
        `${chalk.green('"')}${chalk.cyan.bold('PALLY_WS')}${chalk.green('"')} ${chalk.grey('envar not set.')} ${chalk.red('Service not Initialized.')}`,
      );
      return;
    }
    this.client = new Pally.Client({
      auth: this.envars.PALLY_WS,
      channel: 'activity-feed',
      room: this.envars.PALLY_CHANNEL,
    });
    this.client.on('campaigntip.notify', this.onTip.bind(this));
    this.client.on('connect', Logger.info.bind(Logger));
    this.client.on('close', Logger.info.bind(Logger));
    this.client.on('error', Logger.info.bind(Logger));
    this.client.on('pong', Logger.info.bind(Logger));
    this.client.on('reconnecting', Logger.info.bind(Logger));
    this.client.connect();
    Logger.init();
  }

  private async onTip(tip: CampaignTip) {
    const t = tip;
    const newDonation = await Donation.create({
      donation_id: t.id,
      cents: t.netAmountInCents,
      display_name: t.displayName,
      message: t.message,
    });
    const donationDto = DonationToDonationDTOMapper.map(newDonation);
    Logger.info('Tip', donationDto.toJSON());
    this.notifications.publish('/topic/donation', donationDto);
  }
}
