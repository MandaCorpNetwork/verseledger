import { isDev } from './isDev';

export class URLUtil {
  public static get messageBroker() {
    if (isDev()) {
      return 'ws://localhost:61616/ws';
    }
    return 'ws://ws.verseledger.space/ws';
  }
  public static get frontendHost() {
    if (isDev()) {
      return 'http://localhost:3000';
    }
    return 'https://verseledger.space';
  }
  public static get backendHost() {
    if (isDev()) {
      return 'http://localhost:3030';
    }
    return 'https://api.verseledger.space';
  }
}
