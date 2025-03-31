import { validate } from 'uuid';
import { eq } from 'drizzle-orm';

import { db } from '@notion-clone/supabase';
import { folders } from '@notion-clone/supabase/schema';
import { Folder } from '../models/folder.schema';

export type FolderResponse = {
  data: Folder[] | null;
  error: string | null;
};

export class FolderRepository {
  static async getFolders(workspaceId: string): Promise<FolderResponse> {
    const isValid = validate(workspaceId);
    if (!isValid)
      return {
        data: null,
        error: 'Error',
      };

    try {
      const results = await db
        .select()
        .from(folders)
        .orderBy(folders.createdAt)
        .where(eq(folders.workspaceId, workspaceId));
      return { data: results, error: null };
    } catch (error) {
      return { data: null, error: 'Error' };
    }
  }
}
