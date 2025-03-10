import { Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Workspace } from '@notion-clone/workspace/server';

import { SelectedWorkspaceComponent } from '../selected-workspace/selected-workspace.component';

@Component({
  selector: 'lib-workspace-dropdown',
  imports: [CommonModule, SelectedWorkspaceComponent],
  template: `
    <div class="relative inline-block text-left">
      <div>
        <span (click)="toggleDropdown()">
          @if (selectedOption(); as option) {
            <lib-selected-workspace [workspace]="option" />
          } @else {
            <span>Select a workspace</span>
          }
        </span>
      </div>
      @if (isOpen()) {
        <div
          class="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] 
          bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted">
          <div class="rounded-md flex flex-col">
            <div class="!p-2">
              @if (privateWorkspaces().length) {
                <ng-container
                  *ngTemplateOutlet="
                    workspaceOptions;
                    context: {
                      workspaces: privateWorkspaces(),
                      type: 'Private',
                    }
                  "></ng-container>
              }
              @if (sharedWorkspaces().length) {
                <ng-container
                  *ngTemplateOutlet="
                    workspaceOptions;
                    context: {
                      workspaces: sharedWorkspaces(),
                      type: 'Shared',
                    }
                  "></ng-container>
              }
              @if (collaboratingWorkspaces().length) {
                <ng-container
                  *ngTemplateOutlet="
                    workspaceOptions;
                    context: {
                      workspaces: collaboratingWorkspaces(),
                      type: 'Collaborating',
                    }
                  "></ng-container>
              }
            </div>
          </div>
        </div>
      }
    </div>

    <ng-template #workspaceOptions let-workspaces="workspaces" let-type="type">
      <p class="text-muted-foreground">{{ type }}</p>
      <hr />
      @for (option of workspaces; track $index) {
        <lib-selected-workspace
          [workspace]="option"
          (workspaceClicked)="handleSelect($event)" />
      }
    </ng-template>
  `,
})
export class WorkspaceDropdownComponent {
  privateWorkspaces = input.required<Workspace[]>();
  sharedWorkspaces = input.required<Workspace[]>();
  collaboratingWorkspaces = input.required<Workspace[]>();
  defaultWorkspace = input<Workspace>();

  // TODO: dispatch SET_WORKSPACES event to global state

  // TODO: set selected option from local store
  selectedOption = signal<Workspace | undefined>(undefined);
  isOpen = signal(false);

  constructor() {
    effect(() => {
      this.selectedOption.set(this.defaultWorkspace());
    });
  }

  toggleDropdown() {
    this.isOpen.update((open) => !open);
  }

  handleSelect(workspace: Workspace) {
    this.selectedOption.set(workspace);
    this.isOpen.set(false);
  }
}
