import { CreateContextFn, createTrpcNitroHandler } from '@analogjs/trpc';

import { H3Event } from 'h3';

import { AppRouter, appRouter } from '@notion-clone/api/server';

import { createAuthClient } from '@/utils';

export const createContext: CreateContextFn<AppRouter> = async (
  event: H3Event,
) => {
  const authClient = createAuthClient(event);

  const {
    data: { user },
  } = await authClient.getUser();

  return {
    user,
  };
};

// export API handler
export default createTrpcNitroHandler({
  router: appRouter,
  createContext,
});
