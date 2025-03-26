import { z } from 'zod';

import { searchUsers } from '@notion-clone/supabase';

import { authProcedure, router } from '@notion-clone/core/trpc';

export const usersRouter = router({
  search: authProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return searchUsers(input);
  }),
});

export type UsersRouter = typeof usersRouter;
