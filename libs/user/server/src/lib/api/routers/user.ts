import { z } from 'zod';

import { authProcedure, router } from '@notion-clone/core_old/trpc';

import { UserRepository } from '../../repository/user.repository';

export const usersRouter = router({
  search: authProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return UserRepository.searchUsers(input);
  }),
});

export type UsersRouter = typeof usersRouter;
