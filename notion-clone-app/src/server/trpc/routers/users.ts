import { z } from 'zod';

import { searchUsers } from '@notion-clone/supabase';

import { protectedProcedure, router } from '../trpc';

export const usersRouter = router({
  search: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return searchUsers(input);
  }),
});
