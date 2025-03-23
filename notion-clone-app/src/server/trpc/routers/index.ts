import { router } from '../trpc';

import { usersRouter } from './users';
import { workspacesRouter } from './workspaces';

export const appRouter = router({
  workspaces: workspacesRouter,
  users: usersRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
