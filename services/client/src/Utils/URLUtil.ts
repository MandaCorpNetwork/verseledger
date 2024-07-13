import { siteMode } from './siteMode';

export class URLUtil {
  static siteMode = siteMode;
  public static get messageBroker() {
    switch (URLUtil.siteMode) {
      case 'LOCAL':
        return 'ws://localhost:61616/ws';
      case 'PRODUCTION':
        return 'ws://ws.verseledger.net/ws';
      case 'STAGING':
        return 'ws://ws.stg.verseledger.net/ws';
      default:
        throw new Error('Unknown Hostname');
    }
  }
  public static get frontendHost() {
    switch (URLUtil.siteMode) {
      case 'LOCAL':
        return 'http://localhost:3000';
      case 'PRODUCTION':
        return 'https://verseledger.net';
      case 'STAGING':
        return 'https://stg.verseledger.net';
      default:
        throw new Error('Unknown Hostname');
    }
  }
  public static get backendHost() {
    switch (URLUtil.siteMode) {
      case 'LOCAL':
        return 'http://localhost:3030';
      case 'PRODUCTION':
        return 'https://api.verseledger.net';
      case 'STAGING':
        return 'https://api.stg.verseledger.net';
      default:
        throw new Error('Unknown Hostname');
    }
  }
}
