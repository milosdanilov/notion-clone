import { PageServerLoad } from '@analogjs/router';
import {
  fail,
  json,
  PageServerAction,
  redirect,
} from '@analogjs/router/server/actions';

import { readFormData } from 'h3';
import { z } from 'zod';
import { v4 } from 'uuid';

import {
  createWorkspace,
  getUserSubscriptionStatus,
  getUserWorkspace,
  Workspace,
} from '@notion-clone/supabase';

import { createAuthClient, createStorageClient } from '@/utils';
import { CreateWorkspaceFormSchema } from '@/dashboard';

export type CreateWorkspaceSubmitErrors = z.inferFlattenedErrors<
  typeof CreateWorkspaceFormSchema
>['fieldErrors'];

export const load = async ({ event }: PageServerLoad) => {
  const authClient = createAuthClient(event);

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

export async function action({ event }: PageServerAction) {
  const formData = await readFormData(event);
  const createDashboardFormData = Object.fromEntries(formData);

  const validated = CreateWorkspaceFormSchema.safeParse(
    createDashboardFormData
  );

  if (!validated.success) {
    return fail<CreateWorkspaceSubmitErrors>(
      422,
      validated.error.flatten().fieldErrors
    );
  }

  const { data } = validated;

  const logo: File = data.logo;
  let filePath = '';
  const workspaceUUID = v4();

  if (logo.size) {
    try {
      const storageClient = createStorageClient(event);

      const { data, error } = await storageClient.uploadWorkspaceLogo(
        workspaceUUID,
        logo
      );

      if (error) {
        throw new Error(error.message);
      }
      filePath = data.path;
    } catch (error) {
      const err = error as Error;
      const errorMsg = err.message || 'Could not upload your workspace logo';

      return fail(400, { upload: errorMsg });
    }
  }

  try {
    const authClient = createAuthClient(event);

    const {
      data: { user },
    } = await authClient.getUser();

    console.log(user);
    if (!user) return;

    const newWorkspace: Workspace = {
      data: null,
      createdAt: new Date().toISOString(),
      iconId: data.workspaceEmoji,
      id: workspaceUUID,
      inTrash: '',
      title: data.workspaceName,
      workspaceOwner: user.id,
      logo: filePath || null,
      bannerUrl: '',
    };

    console.log(newWorkspace);
    await createWorkspace(newWorkspace);
  } catch (error) {
    const err = error as Error;
    const errorMsg =
      err.message ||
      `Could not create workspace with the name: ${data.workspaceName}`;

    return fail(400, { createWorkspace: errorMsg });
  }

  return json({});
}
