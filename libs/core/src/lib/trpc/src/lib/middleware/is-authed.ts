import { TRPCError } from '@trpc/server';
import { Context } from '../context';

export const isAuthed = <R>({
  ctx,
  next,
}: {
  ctx: Context;
  next: ({ ctx }: { ctx: Context }) => R;
}) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User has no access to this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
};
