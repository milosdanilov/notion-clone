import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { workspaces } from '@notion-clone/supabase/schema';

export const WorkspaceInsertSchema = createInsertSchema(workspaces);

export type WorkspaceInsert = Zod.infer<typeof WorkspaceInsertSchema>;

export const WorkspaceSelectSchema = createSelectSchema(workspaces);

export type Workspace = Zod.infer<typeof WorkspaceSelectSchema>;
