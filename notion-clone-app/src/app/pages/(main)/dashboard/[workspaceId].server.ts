import { PageServerLoad } from '@analogjs/router';
import { redirect } from '@analogjs/router/server/actions';

import { getUserSubscriptionStatus } from '@notion-clone/supabase';
import { WorkspaceRepository } from '@notion-clone/workspace/server';
import { FolderRepository } from '@notion-clone/folder/server';

export const load = async ({ event, params }: PageServerLoad) => {
  const authClient = event.context.authClient;

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

  const { data: workspaceFolderData, error: foldersError } =
    await FolderRepository.getFolders(params['workspaceId']);

  if (subscriptionError || foldersError) {
    // TODO: check, this is incorrect
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
    user: user,
  };
};
