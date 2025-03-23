import { z } from 'zod';

import { addCollaborators } from '@notion-clone/supabase';

import {
  createWorkspaceModel,
  WorkspaceRepository,
} from '@notion-clone/workspace/server';

import { protectedProcedure, router } from '../trpc';

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
  createPrivate: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      return createWorkspace(input.title, ctx.user.id);
    }),
  createShared: protectedProcedure
    // TODO: use drizzle zod schema for collaborators
    .input(z.object({ title: z.string(), collaborators: z.any() }))
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      const { workspace } = await createWorkspace(input.title, ctx.user.id);
      await addCollaborators(input.collaborators, workspace.id);
    }),
});
