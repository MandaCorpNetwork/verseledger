import { injectable } from 'inversify';

import { Client } from '@stomp/stompjs';

import { WebSocket } from 'ws';
import { Logger } from '@/utils/Logger';
import { EnvService } from './env.service';
Object.assign(global, { WebSocket });
const env = new EnvService();
//TODO: Set Up Users
const client = new Client({
  brokerURL: `${env.BROKER_HOST}/ws`,
  connectHeaders: {
    login: env.RABBIT_USER,
    password: env.RABBIT_PASS,
  },
});
client.activate();

@injectable()
export class StompService {
  constructor() {
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
