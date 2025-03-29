import { InferSelectModel } from 'drizzle-orm';
import { users } from '@notion-clone/supabase/schema';

export type User = InferSelectModel<typeof users>;
