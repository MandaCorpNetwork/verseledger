import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const Database = new SQLDatabase('database', {
  migrations: './migrations',
});
