import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { Workspace } from '@notion-clone/workspace/server';

import { WorkspaceService } from './services/workspace.service';

type WorkspaceState = {
  privateWorkspaces: Workspace[] | [];
  sharedWorkspaces: Workspace[] | [];
  collaboratingWorkspaces: Workspace[] | [];
  selectedWorkspaceId: string | null;
};

const initialState: WorkspaceState = {
  privateWorkspaces: [],
  sharedWorkspaces: [],
  collaboratingWorkspaces: [],
  selectedWorkspaceId: null,
};

export const WorkspaceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    allWorkspaces: computed(() => {
      return [
        ...store.privateWorkspaces(),
        ...store.sharedWorkspaces(),
        ...store.collaboratingWorkspaces(),
      ];
    }),
  })),
  withComputed(
    (
      { allWorkspaces, selectedWorkspaceId },
      workspaceService = inject(WorkspaceService),
    ) => ({
      selectedWorkspace: computed(() => {
        return allWorkspaces().find(
          (workspace) => workspace.id === selectedWorkspaceId(),
        );
      }),
      workspaceLogoUrls: computed(() => {
        return allWorkspaces().reduce(
          (acc, { logo, id }) => {
            acc[id] = workspaceService.getLogoPublicUrl(logo);
            return acc;
          },
          {} as Record<string, string>,
        );
      }),
    }),
  ),
  withMethods((store) => ({
    initialize: (payload: WorkspaceState) => {
      patchState(store, { ...payload });
    },
    selectWorkspace: (workspaceId: string) => {
      patchState(store, { selectedWorkspaceId: workspaceId });
    },
    addPrivateWorkspace: (workspace: Workspace) => {
      patchState(store, {
        privateWorkspaces: [...store.privateWorkspaces(), workspace],
      });
    },
  })),
);
