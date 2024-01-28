import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

const appManifest: Partial<VitePWAOptions> = {};

export default defineConfig({
  root: './',
  plugins: [react({ tsDecorators: true }), VitePWA(appManifest), svgr({
    svgrOptions: {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgoConfig: {
        floatPrecision: 2,
      },
    }})
  ],
  server: {
    port: 3030,
  },
});
