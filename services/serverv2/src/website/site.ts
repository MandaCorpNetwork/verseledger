import { api } from 'encore.dev/api';

export const getFile = api.static({
  expose: true,
  path: '/!path',
  dir: './build',
  notFound: './build/index.html'
})
