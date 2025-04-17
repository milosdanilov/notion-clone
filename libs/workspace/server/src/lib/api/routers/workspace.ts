import { z } from 'zod';

import { addCollaborators } from '@notion-clone/supabase';

import { authProcedure, router } from '@notion-clone/core_old/trpc';

import { WorkspaceRepository } from '../../repository/workspace.repository';

import {
  Workspace,
  WorkspaceInsert,
  WorkspaceInsertSchema,
  WorkspaceSelectSchema,
} from '../../models/workspace.schema';

import { createWorkspaceModel } from '../../models/workspace.model';

const createWorkspace = async (
  payload: WorkspaceInsert,
): Promise<Workspace> => {
  const model = createWorkspaceModel(payload);

  const [workspace] = await WorkspaceRepository.create(model);

  return {
    ...workspace,
  };
};

const CreatePrivateInputSchema = WorkspaceInsertSchema.partial({
  workspaceOwner: true,
});

const CreateSharedInputSchema = WorkspaceInsertSchema.partial({
  workspaceOwner: true,
}).merge(
  z.object({
    collaborators: z.array(z.object({ id: z.string() })),
  }),
);

export const workspacesRouter = router({
  createPrivate: authProcedure
    .input(CreatePrivateInputSchema)
    .output(WorkspaceSelectSchema)
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      return createWorkspace({
        title: input.title,
        workspaceOwner: ctx.user.id,
      });
    }),
  createShared: authProcedure
    .input(CreateSharedInputSchema)
    .output(WorkspaceSelectSchema)
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      const workspace = await createWorkspace({
        title: input.title,
        workspaceOwner: ctx.user.id,
      });
      await addCollaborators(input.collaborators, workspace.id);
      return workspace;
    }),
  // getLogoUrl: authProcedure
  //   .input(z.object({ workspaceId: z.string() }))
  //   .output(z.string())
  //   .query(({ ctx, input }) => {
  //     return ctx.storage.getWorkspaceLogoUrl(input.workspaceId);
  //   }),
});

export type WorkspacesRouter = typeof workspacesRouter;
