import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const AuthDB = new SQLDatabase('auth-database', {
  migrations: './migrations',
});

export interface AuthToken {
  id: string;
  user_id: string;
  token_id: string;
  type: string;
  name: string;
  expires_at: Date;
  created_at: Date;
  last_used_at: Date;
}
