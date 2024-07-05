import { defineConfig } from 'cypress';
export default defineConfig({
  projectId: 'ajqx12',
  env: {
    MYSQL_DATABASE: 'verseledger-app',
    MYSQL_USER: 'verseledger-app',
    MYSQL_PASSWORD: 'verseledger-password',
    MYSQL_HOST: 'localhost',
    MYSQL_PORT: 3306,
    EXPRESS_PORT: 3030,
  },
  e2e: {
    experimentalStudio: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
