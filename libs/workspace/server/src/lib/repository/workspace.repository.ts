import { db } from '@notion-clone/supabase';

import { workspaces } from '../../../../../supabase/migrations/schema';

import { Workspace } from '../models/workspace.model';

export class WorkspaceRepository {
  static getByUserId(userId: string): Promise<Workspace | undefined> {
    return db.query.workspaces.findFirst({
      where: (workspace, { eq }) => eq(workspace.workspaceOwner, userId),
    });
  }

  static create(workspace: Workspace): Promise<Workspace[]> {
    return db.insert(workspaces).values(workspace).returning();
  }
}
