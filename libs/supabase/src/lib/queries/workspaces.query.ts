import { InferSelectModel } from 'drizzle-orm';
import { db } from '../db';
import { workspaces } from '../../../migrations/schema';

// TODO: Move this to some model
export type Workspace = InferSelectModel<typeof workspaces>;

export const getUserWorkspace = async (
  userId: string
): Promise<Workspace | undefined> => {
  return db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, userId),
  });
};

export const createWorkspace = async (workspace: Workspace) => {
  return db.insert(workspaces).values(workspace);
};
