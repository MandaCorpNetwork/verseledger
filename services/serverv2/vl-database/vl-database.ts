import { SQLDatabase } from 'encore.dev/storage/sqldb';

// Create SQLDatabase instance with migrations configuration
const DB = new SQLDatabase('vl-database', {
  migrations: './migrations',
});

export { DB };
