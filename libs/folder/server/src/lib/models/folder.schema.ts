import { folders } from '@notion-clone/supabase/schema';
import { createSelectSchema } from 'drizzle-zod';

export const FolderSchema = createSelectSchema(folders);

export type Folder = Zod.infer<typeof FolderSchema>;
