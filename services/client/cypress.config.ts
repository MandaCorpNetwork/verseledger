import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'ajqx12',
  e2e: {
    experimentalStudio: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
