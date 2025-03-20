import { getHostname } from './getHostname';

export const siteMode = (() => {
  const hostname = getHostname;
  console.log(hostname);
  switch (hostname) {
    case 'localhost':
      return 'LOCAL';
    case 'verseledger.net':
      return 'LIVE';
    case 'stg.verseledger.net':
      return 'STAGING';
    default:
      return 'INVALID';
  }
})();
