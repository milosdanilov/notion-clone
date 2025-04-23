import { PageServerAction } from '@analogjs/router/server/actions';

import { createError } from 'h3';

export const load = async ({ event }: PageServerAction) => {
  const authClient = event.context.authClient;

  const {
    data: { user },
  } = await authClient.getUser();

  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "You don't have permission to access this resource",
    });
  }

  return user;
};
