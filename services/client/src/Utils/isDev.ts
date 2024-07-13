import { siteMode } from './siteMode';

export const isDev = () => {
  return siteMode() === 'LOCAL';
};
