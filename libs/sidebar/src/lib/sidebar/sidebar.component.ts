import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassValue, clsx } from 'clsx';
import { WorkspaceDropdownComponent } from './workspace-dropdown/workspace-dropdown.component';
import { Workspace } from '@notion-clone/workspace/server';

@Component({
  selector: 'lib-sidebar',
  imports: [CommonModule, WorkspaceDropdownComponent],
  template: `
    <aside [class]="asideStyles()">
      <div>
        <lib-workspace-dropdown
          [privateWorkspaces]="privateWorkspaces()"
          [sharedWorkspaces]="sharedWorkspaces()"
          [collaboratingWorkspaces]="collaboratingWorkspaces()"
          [defaultWorkspace]="defaultWorkspace()" />
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
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
}
