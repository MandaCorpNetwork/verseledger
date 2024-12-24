import { SQLDatabase } from 'encore.dev/storage/sqldb';

// Create SQLDatabase instance with migrations configuration
const VLDB = new SQLDatabase('vl-database', {
  migrations: './migrations',
});

export { VLDB };
