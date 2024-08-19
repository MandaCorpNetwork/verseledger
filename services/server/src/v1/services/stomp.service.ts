import { injectable } from 'inversify';

import { Client } from '@stomp/stompjs';

import { WebSocket } from 'ws';
import { Logger } from '@/utils/Logger';
Object.assign(global, { WebSocket });
//TODO: Set Up Users
const client = new Client({
  //TODO: Wire up mode - STAGING
  //brokerURL: 'wss://ws.stg.verseledger.net/ws',
  brokerURL: 'ws://localhost:61616/ws',
  connectHeaders: {
    login: 'Server',
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
}
