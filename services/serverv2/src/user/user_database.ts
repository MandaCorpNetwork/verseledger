import { SQLDatabase } from 'encore.dev/storage/sqldb';

// Create SQLDatabase instance with migrations configuration
const UserDB = new SQLDatabase('user_database', {
  migrations: './migrations',
});

export { UserDB };
