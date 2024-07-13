import { getHostname } from './getHostname';

export const siteMode = () => {
  const hostname = getHostname();
  switch (hostname) {
    case 'localhost':
      return 'LOCAL';
    case 'verseledger.net':
      return 'PRODUCTION';
    case 'stg.verseledger.net':
      return 'STAGING';
    default:
      return 'INVALID';
  }
};
