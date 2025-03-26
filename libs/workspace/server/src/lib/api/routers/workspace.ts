import { z } from 'zod';

import { addCollaborators } from '@notion-clone/supabase';

import { authProcedure, router } from '@notion-clone/core/trpc';

import { createWorkspaceModel } from '../../models/workspace.model';
import { WorkspaceRepository } from '../../repository/workspace.repository';

const createWorkspace = async (title: string, userId: string) => {
  const model = createWorkspaceModel({
    title: title,
    workspaceOwner: userId,
    iconId: '💼',
  });

  const [workspace] = await WorkspaceRepository.create(model);

  return {
    workspace,
  };
};

// TODO: use output validation
export const workspacesRouter = router({
  createPrivate: authProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      return createWorkspace(input.title, ctx.user.id);
    }),
  createShared: authProcedure
    // TODO: use drizzle zod schema for collaborators
    .input(z.object({ title: z.string(), collaborators: z.any() }))
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      const { workspace } = await createWorkspace(input.title, ctx.user.id);
      await addCollaborators(input.collaborators, workspace.id);
    }),
});

export type WorkspacesRouter = typeof workspacesRouter;
