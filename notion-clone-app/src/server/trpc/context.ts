import { createAuthClient } from '@/utils';
import { inferAsyncReturnType } from '@trpc/server';
import { H3Event } from 'h3';
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (event: H3Event) => {
  const authClient = createAuthClient(event);

  const {
    data: { user },
  } = await authClient.getUser();

  return {
    user,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;
