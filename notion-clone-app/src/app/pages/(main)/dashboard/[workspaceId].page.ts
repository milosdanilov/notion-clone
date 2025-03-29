import { LoadResult } from '@analogjs/router';
import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '@/components';

import { load } from './[workspaceId].server';

@Component({
  selector: 'nc-workspace-layout-page',
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <main class="flex overflow-hidden h-screen w-screen">
      <nc-sidebar
        [privateWorkspaces]="privateWorkspaces()"
        [collaboratingWorkspaces]="collaboratingWorkspaces()"
        [sharedWorkspaces]="sharedWorkspaces()"
        [defaultWorkspace]="defaultWorkspace()"
        [user]="user()" />

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

  readonly privateWorkspaces = computed(
    () => this.load()?.privateWorkspaces || [],
  );
  readonly collaboratingWorkspaces = computed(
    () => this.load()?.collaboratingWorkspaces || [],
  );
  readonly sharedWorkspaces = computed(
    () => this.load()?.sharedWorkspaces || [],
  );

  readonly defaultWorkspace = computed(() =>
    [
      ...this.privateWorkspaces(),
      ...this.collaboratingWorkspaces(),
      ...this.sharedWorkspaces(),
    ].find((workspace) => workspace.id === this.load()?.workspaceId),
  );

  readonly user = computed(() => this.load()?.user);
}
