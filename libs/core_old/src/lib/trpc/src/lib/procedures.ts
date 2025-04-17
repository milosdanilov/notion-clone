import { isAuthed } from './middleware/is-authed';

import { publicProcedure } from './trpc';

export const authProcedure = publicProcedure.use(isAuthed);
