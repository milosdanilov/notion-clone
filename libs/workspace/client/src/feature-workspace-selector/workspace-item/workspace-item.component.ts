import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Workspace } from '@notion-clone/workspace/server';

@Component({
  selector: 'lib-workspace-item',
  imports: [CommonModule, RouterLink],
  template: `
    <a
      routerLink="{{ '/dashboard/' + workspace().id }}"
      (click)="workspaceClicked.emit(workspace())"
      class="flex rounded-md hover:bg-muted transition-all 
      flex-row p-2 gap-4 justify-center cursor-pointer items-center my-2">
      <img
        [src]="workspaceLogo()"
        alt="workspace logo"
        width="26"
        height="26"
        [style]="{ objectFit: 'cover' }" />
      <div class="flex flex-col">
        <p
          class="text-lg w-[170px] overflow-hidden 
          overflow-ellipsis whitespace-nowrap">
          {{ workspace().title }}
        </p>
      </div>
    </a>
  `,
})
export class WorkspaceItemComponent {
  workspace = input.required<Workspace>();
  workspaceClicked = output<Workspace>();

  workspaceLogo = input.required<string>();
}
