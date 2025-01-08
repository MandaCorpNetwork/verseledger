import { SQLDatabase } from 'encore.dev/storage/sqldb';

// Create SQLDatabase instance with migrations configuration
const UserSettingsDB = new SQLDatabase('user_settings_database', {
  migrations: './migrations',
});

export { UserSettingsDB };
