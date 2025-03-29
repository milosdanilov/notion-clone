import { Component, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthUser } from '@supabase/supabase-js';

import { Workspace } from '@notion-clone/workspace/server';

import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';

import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';

import { WorkspaceItemComponent } from './workspace-item/workspace-item.component';
import { WorkspaceCreatorComponent } from './workspace-creator/workspace-creator.component';

@Component({
  selector: 'lib-workspace-selector',
  imports: [
    CommonModule,
    HlmDialogComponent,
    BrnDialogTriggerDirective,
    HlmDialogContentComponent,
    BrnDialogContentDirective,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    WorkspaceCreatorComponent,
    WorkspaceItemComponent,
  ],
  template: `
    <div class="relative inline-block text-left">
      <div>
        <span (click)="toggleDropdown()">
          @if (selectedOption(); as option) {
            <lib-workspace-item [workspace]="option" />
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
            <hlm-dialog>
              <button
                brnDialogTrigger
                class="flex transition-all hover:bg-muted justify-center
              items-center gap-2 p-2 w-full">
                <article
                  class="text-slate-500 rounded-full bg-slate-800 
                    w-4 h-4 flex items-center justify-center">
                  +
                </article>
                Create workspace
              </button>
              <hlm-dialog-content
                *brnDialogContent="let ctx"
                class="h-screen block sm:h-[440px] overflow-scroll w-full">
                <hlm-dialog-header>
                  <h3 hlmDialogTitle>Create a Workspace</h3>
                  <p hlmDialogDescription
                    >Workspaces give you the power to collaborate with others.
                    You can change your workspace privacy settings after
                    creating the workspace too.</p
                  >
                  <div>
                    <lib-workspace-creator [user]="user()" />
                  </div>
                </hlm-dialog-header>
              </hlm-dialog-content>
            </hlm-dialog>
          </div>
        </div>
      }
    </div>

    <ng-template #workspaceOptions let-workspaces="workspaces" let-type="type">
      <p class="text-muted-foreground">{{ type }}</p>
      <hr />
      @for (option of workspaces; track $index) {
        <lib-workspace-item
          [workspace]="option"
          (workspaceClicked)="handleSelect($event)" />
      }
    </ng-template>
  `,
})
export class WorkspaceSelectorComponent {
  privateWorkspaces = input.required<Workspace[]>();
  sharedWorkspaces = input.required<Workspace[]>();
  collaboratingWorkspaces = input.required<Workspace[]>();
  defaultWorkspace = input<Workspace>();
  user = input<AuthUser>();

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
