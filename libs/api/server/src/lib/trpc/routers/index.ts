import { router } from '@notion-clone/core_old/trpc';

import { workspacesRouter } from '@notion-clone/workspace/server';
import { usersRouter } from '@notion-clone/user/server';

export const appRouter = router({
  workspaces: workspacesRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
