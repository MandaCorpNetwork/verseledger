import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const appManifest: Partial<VitePWAOptions> = {};

export default defineConfig({
  root: './src',
  plugins: [react({ tsDecorators: true }), VitePWA(appManifest)],
  server: {
    port: 3030,
  },
});
