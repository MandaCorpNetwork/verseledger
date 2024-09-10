import { injectable } from 'inversify';
import { Logger } from '@/utils/Logger';

@injectable()
export class ChatService {
  constructor() {
    Logger.init();
  }
}
