import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Workspace } from '@notion-clone/workspace/server';

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
  withComputed(({ allWorkspaces, selectedWorkspaceId }) => ({
    selectedWorkspace: computed(() => {
      return allWorkspaces().find(
        (workspace) => workspace.id === selectedWorkspaceId(),
      );
    }),
  })),
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
