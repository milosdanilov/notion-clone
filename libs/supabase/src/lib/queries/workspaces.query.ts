import { InferSelectModel } from 'drizzle-orm';
import { db } from '../db';
import { workspaces } from '../../../migrations/schema';

export type Workspace = InferSelectModel<typeof workspaces>;

export const getUserWorkspace = async (
  userId: string
): Promise<Workspace | undefined> => {
  return db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, userId),
  });
};
