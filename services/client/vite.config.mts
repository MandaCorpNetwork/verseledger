import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const appManifest: Partial<VitePWAOptions> = {};

export default defineConfig({
  root: './src',
  build: {
    outDir: '../build',
  },
  plugins: [
    react({ tsDecorators: true }),
    VitePWA(appManifest),
    tsconfigPaths(),
    nodePolyfills(),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
