import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import AdapterDateFns from '@mui/x-date-pickers';
import tsconfigPaths from 'vite-tsconfig-paths';

const appManifest: Partial<VitePWAOptions> = {};

export default defineConfig({
  root: './src',
  plugins: [react({ tsDecorators: true }), VitePWA(appManifest), tsconfigPaths(), AdapterDateFns()],
  server: {
    port: 3000,
  },
});
