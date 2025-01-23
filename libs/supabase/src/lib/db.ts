import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as dotenv from 'dotenv';
import * as schema from './../../migrations/schema';

dotenv.config({ path: '.env' });

if (!process.env['DATABASE_URL']) {
  console.log('No database URL');
}

const client = postgres(process.env['DATABASE_URL'] as string, { max: 1 });
export const db = drizzle(client, { schema });

const migrateDb = async () => {
  try {
    console.log('Migrating client ...');
    await migrate(db, { migrationsFolder: 'libs/supabase/migrations' });
    console.log('Succesfully migrated!');
  } catch (error) {
    console.log('Error migrating client');
  }
};

migrateDb();
