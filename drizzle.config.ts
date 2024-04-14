import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('Cannot find database url');
}

export default {
    schema: './libs/supabase/src/lib/schema.ts',
    out: './libs/supabase/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || '',
    }
} satisfies Config;