import { and } from 'drizzle-orm';

import { User } from '../types/db.types';
import { db } from '../db';
import { collaborators } from '../schema';

export const addCollaborators = async (users: User[], workspaceId: string) => {
  users.forEach(async (user: User) => {
    const exists = await db.query.collaborators.findFirst({
      where: (u, { eq }) =>
        and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
    });
    if (!exists) {
      await db.insert(collaborators).values({ workspaceId, userId: user.id });
    }
  });
};
