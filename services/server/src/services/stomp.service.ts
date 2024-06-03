import { injectable } from 'inversify';

import { Client } from '@stomp/stompjs';

import { WebSocket } from 'ws';
Object.assign(global, { WebSocket });
//TODO: Set Up Users
const client = new Client({
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
