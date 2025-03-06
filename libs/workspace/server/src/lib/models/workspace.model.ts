import { InferSelectModel } from 'drizzle-orm';

import { v4 } from 'uuid';

import { workspaces } from 'libs/supabase/migrations/schema';

export type Workspace = InferSelectModel<typeof workspaces>;

export function createWorkspaceModel(data: {
  title: string;
  workspaceOwner: string;
  iconId: string;
  logo?: string;
}): Workspace {
  return {
    data: null,
    createdAt: new Date().toISOString(),
    iconId: data.iconId,
    id: v4(),
    inTrash: '',
    title: data.title,
    workspaceOwner: data.workspaceOwner,
    logo: data.logo || null,
    bannerUrl: '',
  };
}
