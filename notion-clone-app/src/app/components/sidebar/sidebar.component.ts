import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthUser } from '@supabase/supabase-js';
import { ClassValue, clsx } from 'clsx';

import { WorkspaceSelectorComponent } from '@notion-clone/workspace/client';
import { Workspace } from '@notion-clone/workspace/server';

@Component({
  selector: 'nc-sidebar',
  imports: [CommonModule, WorkspaceSelectorComponent],
  template: `
    <aside [class]="asideStyles()">
      <div>
        <lib-workspace-selector
          [privateWorkspaces]="privateWorkspaces()"
          [sharedWorkspaces]="sharedWorkspaces()"
          [collaboratingWorkspaces]="collaboratingWorkspaces()"
          [defaultWorkspace]="defaultWorkspace()"
          [user]="user()" />
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  readonly userClass = input<ClassValue>('', { alias: 'class' });

  asideStyles = computed(() =>
    clsx(
      'hidden',
      'sm:flex',
      'sm:flex-col',
      'w-[280px]',
      'shink-0',
      'p-4',
      'md:gap-4',
      '!justify-between',
      this.userClass(),
    ),
  );

  privateWorkspaces = input.required<Workspace[]>();
  sharedWorkspaces = input.required<Workspace[]>();
  collaboratingWorkspaces = input.required<Workspace[]>();
  defaultWorkspace = input<Workspace>();
  user = input<AuthUser>();
}
