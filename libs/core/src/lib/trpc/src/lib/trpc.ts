import { initTRPC } from '@trpc/server';

import { isAuthed } from './middleware/is-authed';
import { Context } from './context';

const t = initTRPC.context<Context>().create({});

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

export const router = t.router;
export const middleware = t.middleware;

export const authProcedure = publicProcedure.use(isAuthed);
