import { PageServerLoad } from '@analogjs/router';
import {
  fail,
  json,
  PageServerAction,
  redirect,
} from '@analogjs/router/server/actions';

import { readFormData } from 'h3';
import { z } from 'zod';

import { getUserSubscriptionStatus } from '@notion-clone/supabase';

import {
  createWorkspaceModel,
  Workspace,
  WorkspaceRepository,
} from '@notion-clone/workspace/server';

import { createAuthClient, createStorageClient, Success } from '@/utils';
import { CreateWorkspaceFormSchema } from '@/dashboard';

export type CreateWorkspaceSubmitErrors = Partial<
  z.inferFlattenedErrors<typeof CreateWorkspaceFormSchema>['fieldErrors'] & {
    auth: string[];
    generalError: string[];
  }
>;

export type CreateWorkspaceSuccessRes = Success<{ workspace: Workspace }>;

export const load = async ({ event }: PageServerLoad) => {
  const authClient = createAuthClient(event);

  const {
    data: { user },
  } = await authClient.getUser();

  if (!user) return;

  const workspace = await WorkspaceRepository.getByUserId(user.id);

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
    createDashboardFormData,
  );

  if (!validated.success) {
    return fail<CreateWorkspaceSubmitErrors>(
      422,
      validated.error.flatten().fieldErrors,
    );
  }

  const { data } = validated;

  const uploadLogo = async (logo: File, workspaceUUID: string) => {
    try {
      const storageClient = createStorageClient(event);

      const { data, error } = await storageClient.uploadWorkspaceLogo(
        workspaceUUID,
        logo,
      );

      if (error) {
        throw error;
      }

      return data.path;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message || 'Could not upload your workspace logo');
    }
  };

  try {
    const authClient = createAuthClient(event);

    const {
      data: { user },
      error,
    } = await authClient.getUser();

    if (error || !user) {
      return fail<CreateWorkspaceSubmitErrors>(403, {
        auth: [error?.message || 'User not found or authenticated'],
      });
    }

    const workspaceModel = createWorkspaceModel({
      title: data.workspaceName,
      workspaceOwner: user.id,
      iconId: data.workspaceEmoji,
    });

    const uploadedLogoPath = data.logo?.size
      ? await uploadLogo(data.logo, workspaceModel.id)
      : null;

    workspaceModel.logo = uploadedLogoPath;

    const [workspace] = await WorkspaceRepository.create(workspaceModel);

    return json<CreateWorkspaceSuccessRes>({
      type: 'success',
      workspace,
    });
  } catch (error) {
    const err = error as Error;

    return fail<CreateWorkspaceSubmitErrors>(400, {
      generalError: [err.message || 'An unexpected error occurred'],
    });
  }
}
