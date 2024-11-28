import { inject, injectable } from 'inversify';

import { Client } from '@stomp/stompjs';

import { WebSocket } from 'ws';
import { Logger } from '@Utils/Logger';
import { EnvService } from './env.service';
import { TYPES } from '@Constant/types';
import { SubscriptionService } from '@V1/models/subscriptions/subscriptions.service';
Object.assign(global, { WebSocket });
const env = new EnvService();
//TODO: Set Up Users
const client = new Client({
  brokerURL: `${env.BROKER_HOST}/ws`,
  connectHeaders: {
    login: 'Server',
  },
});
client.activate();

@injectable()
export class StompService {
  constructor(
    @inject(TYPES.SubscriptionService)
    private readonly vapid: SubscriptionService,
  ) {
    Logger.init();
  }
  public get client() {
    return client;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publish(destination: string, body: Record<any, any> | string) {
    return this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}
