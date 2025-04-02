import { LoadResult } from '@analogjs/router';
import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WorkspaceStore } from '@notion-clone/workspace/client';

import { SidebarComponent } from '@/components';

import { load } from './[workspaceId].server';

@Component({
  selector: 'nc-workspace-layout-page',
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <main class="flex overflow-hidden h-screen w-screen">
      <nc-sidebar [user]="user()" />

      <div
        class="dark:border-Neutrals/neutrals-12/70 
        border-l-[1px] w-full relative overflow-scroll">
        <router-outlet />
      </div>
    </main>
  `,
})
export default class WorkspacePageLayoutComponent {
  load = input.required<LoadResult<typeof load>>();

  private workspaceStore = inject(WorkspaceStore);

  constructor() {
    effect(() => {
      const loaded = this.load();

      this.workspaceStore.initialize({
        privateWorkspaces: loaded?.privateWorkspaces || [],
        sharedWorkspaces: loaded?.sharedWorkspaces || [],
        collaboratingWorkspaces: loaded?.collaboratingWorkspaces || [],
        selectedWorkspaceId: loaded?.workspaceId || null,
      });
    });
  }

  readonly user = computed(() => this.load()?.user);
}
