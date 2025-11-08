import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const PWA_OPTIONS: Partial<VitePWAOptions> = {
  workbox: { maximumFileSizeToCacheInBytes: 5000000, globPatterns: ['**/*'] },
  includeManifestIcons: true,
  includeAssets: ['**/*'],
  injectManifest: { maximumFileSizeToCacheInBytes: 10_000_000 },
  strategies: 'injectManifest',
  injectRegister: 'auto',
  registerType: 'autoUpdate',
  devOptions: { enabled: true, type: 'module' },
  filename: 'sw.js',
  manifest: {
    id: 'https://stg.verseledger.net',
    background_color: '#000113',
    categories: ['star citizen'],
    description: 'A Star Citizen Companion Application',
    display: 'standalone',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '256x256',
        type: 'image/x-icon',
      },
      {
        src: 'logo16.png',
        type: 'image/png',
        sizes: '16x16',
      },
      {
        src: 'logo32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: 'logo48.png',
        type: 'image/png',
        sizes: '48x48',
      },
      {
        src: 'logo64.png',
        type: 'image/png',
        sizes: '64x64',
      },
      {
        src: 'logo192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: 'logo512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    name: 'Verse Ledger',
    orientation: 'landscape',
    short_name: 'Verse Ledger',
    screenshots: [
      {
        src: 'logo640x320.png',
        sizes: '640x320',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Application',
      },
    ],
    start_url: '/',
    theme_color: '#000113',
  },
};

export default defineConfig({
  appType: 'spa',
  root: './src',
  build: { outDir: '../build' },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mdx() as any,
    react({ tsDecorators: true }),
    ...VitePWA(PWA_OPTIONS),
    tsconfigPaths(),
    nodePolyfills(),
  ],
  server: {
    port: 3000,
    allowedHosts: ['localhost:3000', 'stg.verseledger.net'],
    cors: { origin: '*' },
  },
  preview: {
    port: 3000,
    allowedHosts: ['stg.verseledger.net'],
    cors: { origin: '*' },
  },
});
