import { injectable } from 'inversify';

import { Connection } from 'rabbitmq-client';

import { WebSocket } from 'ws';
import { Logger } from '@/utils/Logger';
import { EnvService } from './env.service';
Object.assign(global, { WebSocket });
const env = new EnvService();
const client = new Connection(
  `amqp://${env.RABBIT_USER}:${env.RABBIT_PASS}@${env.RABBIT_HOST}`,
);

client.exchangeDeclare({
  exchange: 'InternalExchange',
  type: 'direct',
});
client.queueDeclare({
  queue: 'InternalQueue',
  durable: false,
  exclusive: false,
});
client.queueBind({
  exchange: 'InternalExchange',
  queue: 'InternalQueue',
  routingKey: 'internal-key',
});
@injectable()
export class RabbitService {
  constructor() {
    Logger.init();
  }
  public get ready() {
    return client.ready;
  }
  public get client() {
    return client;
  }
}
