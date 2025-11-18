export const getHostname = (() => {
  return window.location.hostname as
    | 'localhost'
    | 'verseledger.net'
    | 'stg.verseledger.net';
})();
