import { PageServerLoad } from '@analogjs/router';
import { redirect } from '@analogjs/router/server/actions';

import { validate } from 'uuid';
import { eq } from 'drizzle-orm';

import { db, getUserSubscriptionStatus } from '@notion-clone/supabase';
import { folders } from '@notion-clone/supabase/schema';
import { WorkspaceRepository } from '@notion-clone/workspace/server';

import { createAuthClient } from '@/utils';

export const load = async ({ event, params }: PageServerLoad) => {
  const authClient = createAuthClient(event);

  const {
    data: { user },
  } = await authClient.getUser();

  if (!user) return;

  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (!params || !params['workspaceId']) {
    console.log('Error: workspaceId is required');
    return;
  }

  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params['workspaceId'],
  );

  if (subscriptionError || foldersError) {
    redirect('/dashboard');
  }

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      WorkspaceRepository.getPrivateWorkspaces(user.id),
      WorkspaceRepository.getCollaboratedWorkspaces(user.id),
      WorkspaceRepository.getSharedWorkspaces(user.id),
    ]);

  return {
    subscription: subscriptionData,
    workspaceFolders: workspaceFolderData,
    privateWorkspaces,
    collaboratingWorkspaces,
    sharedWorkspaces,
    workspaceId: params['workspaceId'],
  };
};

// TODO: Move this to it's own lib
export const getFolders = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  if (!isValid)
    return {
      data: null,
      error: 'Error',
    };

  try {
    const results = await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId));
    return { data: results, error: null };
  } catch (error) {
    return { data: null, error: 'Error' };
  }
};
