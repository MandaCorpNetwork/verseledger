import { injectable } from 'inversify';

import { Client } from '@stomp/stompjs';

import { WebSocket } from 'ws';
Object.assign(global, { WebSocket });
//TODO: Set Up Users
const client = new Client({
  //TODO: Wire up mode - STAGING
  //brokerURL: 'wss://vl-activemq:61616/ws',
  brokerURL: 'ws://localhost:61616/ws',
  connectHeaders: {
    login: 'Server',
  },
});
client.activate();

@injectable()
export class StompService {
  public get client() {
    return client;
  }
}
