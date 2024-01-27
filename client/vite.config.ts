import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import viteGlob from 'vite-plugin-glob';

const appManifest: Partial<VitePWAOptions> = {};

export default defineConfig({
  root: './',
  plugins: [react({ tsDecorators: true }), VitePWA(appManifest), viteGlob()],
  server: {
    port: 3030,
  },
});
