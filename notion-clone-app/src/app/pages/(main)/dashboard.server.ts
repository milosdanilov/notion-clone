import { PageServerLoad } from '@analogjs/router';
import { redirect } from '@analogjs/router/server/actions';

import {
  getUserSubscriptionStatus,
  getUserWorkspace,
} from '@notion-clone/supabase';

import { createServerClient } from '@/auth';

export const load = async ({ event }: PageServerLoad) => {
  const authClient = createServerClient(event);

  const {
    data: { user },
  } = await authClient.getUser();

  if (!user) return;

  const workspace = await getUserWorkspace(user.id);

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;

  if (!workspace) {
    return {
      user,
      subscription,
    };
  }

  redirect(`/dashboard/${workspace.id}`);

  return;
};
