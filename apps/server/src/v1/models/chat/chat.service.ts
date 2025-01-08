import { injectable } from 'inversify';
import { Logger } from '@Utils/Logger';

@injectable()
export class ChatService {
  constructor() {
    Logger.init();
  }
}
