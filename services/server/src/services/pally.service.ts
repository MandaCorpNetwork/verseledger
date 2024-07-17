import { inject, injectable } from 'inversify';
import { TYPES } from '@Constant/types';
import { EnvService } from './env.service';
import WebSocket from 'ws';
import { Logger } from '@/utils/Logger';

type PallyPayload = {
  type: 'campaigntip.notify' | 'echo';
  payload: unknown;
};

type NotifyPayload = {
  type: 'campaigntip.notify';
  payload: {
    campaignTip: {
      createdAt: string;
      displayName: string;
      grossAmountInCents: number;
      id: string;
      message: string;
      netAmountInCents: number;
      processingFeeInCents: number;
      updatedAt: string;
    };
    page: {
      id: string;
      slug: string;
      title: string;
      url: string;
    };
  };
};

@injectable()
export class PallyService {
  protected client?: WebSocket;
  protected interval?: NodeJS.Timeout;

  constructor(@inject(TYPES.EnvService) private readonly _envars: EnvService) {
    Logger.info('Initializing Pally Service');
    if (this._envars.PALLY_WS == null) {
      Logger.error('Cancelled. "PALLY_WS" envar not set.');
      return;
    }
    this.client = new WebSocket(this.activityFeed);
    this.client.on('message', this.onMessage.bind(this));
    this.client.on('error', this.onError.bind(this));
    this.client.on('open', () => {
      Logger.info('Websocket Established');
      this.interval = setInterval(this.ping, 60_000);
    });
  }
  get activityFeed() {
    return `wss://events.pally.gg?auth=${this._envars.PALLY_WS}&channel=activity-feed&room=${this._envars.PALLY_CHANNEL}`;
  }
  private onMessage(data: WebSocket.RawData) {
    const message = JSON.parse(data.toString()) as PallyPayload | 'pong';
    if (message == 'pong') return;
    switch (message.type) {
      case 'campaigntip.notify': {
        return this.onTip(message as NotifyPayload);
      }
      case 'echo':
      default:
        break;
    }
  }
  private onError(data: WebSocket.ErrorEvent) {
    Logger.error(data);
  }

  private onTip(tip: NotifyPayload) {
    Logger.info(tip);
  }

  private ping() {
    this.client?.send('ping');
  }
}
