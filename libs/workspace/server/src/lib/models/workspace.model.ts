import { v4 } from 'uuid';

import { Workspace, WorkspaceInsert } from './workspace.schema';

export function createWorkspaceModel({
  iconId,
  title,
  workspaceOwner,
  logo,
}: WorkspaceInsert): Workspace {
  return {
    data: null,
    createdAt: new Date().toISOString(),
    iconId: iconId || '💼',
    id: v4(),
    inTrash: '',
    title: title,
    workspaceOwner: workspaceOwner,
    logo: logo || null,
    bannerUrl: '',
  };
}
