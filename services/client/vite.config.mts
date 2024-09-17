import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const PWA_OPTIONS: Partial<VitePWAOptions> = {
  workbox: { maximumFileSizeToCacheInBytes: 5000000 },
  strategies: 'injectManifest',
  injectRegister: 'auto',
  registerType: 'autoUpdate',
  devOptions: { enabled: true, type: 'module' },
  filename: 'sw.js',
};

export default defineConfig({
  appType: 'spa',
  root: './src',
  build: { outDir: '../build' },
  plugins: [
    react({ tsDecorators: true }),
    ...VitePWA(PWA_OPTIONS),
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
