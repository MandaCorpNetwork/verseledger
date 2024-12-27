import { SQLDatabase } from 'encore.dev/storage/sqldb';
import { Bucket } from 'encore.dev/storage/objects';

// Define a bucket named 'profile-files' for storing files.
// Making it possible to get public URLs to files in the bucket
// by setting 'public' to true
export const filesBucket = new Bucket('profile_files', {
  versioned: false,
  public: true,
});

// Define a database named 'files', using the database migrations
// in the "./migrations" folder. Encore automatically provisions,
// migrates, and connects to the database.
export const DB = new SQLDatabase('files', {
  migrations: './migrations',
});
