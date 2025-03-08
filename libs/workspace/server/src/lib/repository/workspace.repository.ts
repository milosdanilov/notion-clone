import { db } from '@notion-clone/supabase';

import {
  collaborators,
  users,
  workspaces,
} from '@notion-clone/supabase/schema';

import { Workspace } from '../models/workspace.model';
import { and, eq, notExists } from 'drizzle-orm';

export class WorkspaceRepository {
  static getByUserId(userId: string): Promise<Workspace | undefined> {
    return db.query.workspaces.findFirst({
      where: (workspace, { eq }) => eq(workspace.workspaceOwner, userId),
    });
  }

  static create(workspace: Workspace): Promise<Workspace[]> {
    return db.insert(workspaces).values(workspace).returning();
  }

  static async getPrivateWorkspaces(userId: string): Promise<Workspace[]> {
    if (!userId) {
      return [];
    }

    const privateWorkspaces = (await db
      .select({
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
      })
      .from(workspaces)
      .where(
        and(
          notExists(
            db
              .select()
              .from(collaborators)
              .where(eq(collaborators.workspaceId, workspaces.id)),
          ),
          eq(workspaces.workspaceOwner, userId),
        ),
      )) as Workspace[];

    return privateWorkspaces;
  }

  static async getCollaboratedWorkspaces(userId: string): Promise<Workspace[]> {
    if (!userId) {
      return [];
    }

    const collaboratedWorkspaces = (await db
      .select({
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
      })
      .from(users)
      .innerJoin(collaborators, eq(users.id, collaborators.userId))
      .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
      .where(eq(users.id, userId))) as Workspace[];

    return collaboratedWorkspaces;
  }

  static async getSharedWorkspaces(userId: string): Promise<Workspace[]> {
    if (!userId) {
      return [];
    }

    const sharedWorkspaces = (await db
      .selectDistinct({
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
      })
      .from(workspaces)
      .orderBy(workspaces.createdAt)
      .innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId))
      .where(eq(workspaces.workspaceOwner, userId))) as Workspace[];

    return sharedWorkspaces;
  }
}
