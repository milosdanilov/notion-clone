import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { firstValueFrom } from 'rxjs';
import { AuthUser } from '@supabase/supabase-js';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLock, lucidePlus, lucideShare } from '@ng-icons/lucide';

import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmScrollAreaDirective } from '@spartan-ng/ui-scrollarea-helm';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

import { User } from '@notion-clone/supabase';
import { injectTrpcClient } from '@notion-clone/api/client';
import { CollaboratorSearchComponent } from '@notion-clone/shared/client';

interface PermissionOption {
  label: string;
  desc: string;
  icon: string;
  value: 'private' | 'shared';
}

const privatePermissionOption: PermissionOption = {
  label: 'Private',
  desc: 'Your workspace is private to you. You can choose to share it later.',
  icon: 'lucideLock',
  value: 'private',
};

const permissionsOptions: PermissionOption[] = [
  privatePermissionOption,
  {
    label: 'Shared',
    desc: 'You can invite collaborators',
    icon: 'lucideShare',
    value: 'shared',
  },
];

@Component({
  selector: 'lib-workspace-creator',
  imports: [
    CommonModule,
    HlmLabelDirective,
    HlmInputDirective,
    BrnSelectImports,
    HlmSelectImports,
    NgIcon,
    HlmButtonDirective,
    CollaboratorSearchComponent,
    HlmScrollAreaDirective,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  providers: [
    provideIcons({
      lucideLock,
      lucideShare,
      lucidePlus,
    }),
  ],
  template: `
    <div class="flex gap-4 flex-col">
      <div>
        <label hlmLabel for="name" class="text-sm text-muted-foreground">
          Name
        </label>

        <div class="flex justify-center items-center gap-2">
          <input
            #nameInput
            hlmInput
            name="name"
            placeholder="Workspace Name"
            [value]="title()"
            (input)="title.set(nameInput.value)" />
        </div>
      </div>
      <label hlmLabel for="permissions" class="text-sm text-muted-foreground">
        Permissions
      </label>

      <brn-select
        [value]="permissions()"
        (valueChange)="setPermissions($event)"
        class="inline-block">
        <hlm-select-trigger class="w-full h-26 -mt-3">
          <hlm-select-value>
            <div class="flex items-center gap-x-2" *brnSelectValue="let value">
              <ng-icon [name]="value.icon" />
              {{ value.label }}
            </div>
          </hlm-select-value>
        </hlm-select-trigger>
        <hlm-select-content>
          @for (option of permissionsOptions; track option.label) {
            <hlm-option [value]="option" class="!pr-0">
              <ng-icon [name]="option.icon" class="mr-2" />
              <article class="flex flex-col">
                <span>{{ option.label }}</span>
                <span>{{ option.desc }}</span>
              </article>
            </hlm-option>
          }
        </hlm-select-content>
      </brn-select>
      @if (permissions().value === 'shared') {
        <div>
          <lib-collaborator-search
            [user]="user()"
            [existingCollaborators]="collaborators()"
            (addCollaborator)="addCollaborator($event)">
            <div ngProjectAs="sheet-trigger">
              <ng-icon hlm class="mr-2" name="lucidePlus" />
              Add Collaborators
            </div>
          </lib-collaborator-search>
          <div class="mt-4">
            <span class="text-sm text-muted-foreground">
              Collaborators {{ collaborators().length || '' }}
            </span>
            <ng-scrollbar
              hlm
              class="relative h-[120px] overflow-y-scroll w-full rounded-md border border-muted-foreground/20">
              @if (collaborators().length) {
                @for (collaborator of collaborators(); track $index) {
                  <div class="p-4 flex justify-between items-center">
                    <div class="flex gap-4 items-center">
                      <hlm-avatar>
                        <img src="/assets/avatars/7.png" hlmAvatarImage />
                        <span hlmAvatarFallback>PJ</span>
                      </hlm-avatar>
                      <div
                        class="text-sm gap-2 text-muted-foreground 
                      overflow-hidden overflow-ellipsis sm:w-[300px] w-[140px]">
                        {{ collaborator.email }}
                      </div>
                    </div>
                    <button
                      hlmBtn
                      variant="secondary"
                      (click)="removeCollaborator(collaborator)">
                      Remove
                    </button>
                  </div>
                }
              } @else {
                <div
                  class="absolute right-0 left-0 
                  top-0 bottom-0 flex justify-center items-center">
                  <span class="text-muted-foreground text-sm">
                    You have no collaborators
                  </span>
                </div>
              }
            </ng-scrollbar>
          </div>
        </div>
      }
      <button
        hlmBtn
        variant="secondary"
        type="button"
        [disabled]="isCreateBtnDisabled()"
        (click)="createItem()">
        Create
      </button>
    </div>
  `,
})
export class WorkspaceCreatorComponent {
  private trpc = injectTrpcClient();
  // TODO: add global supabase user state, read user from that
  // check the @/lib/providers/supabase-user-provider file
  user = input<AuthUser>();

  public readonly permissionsOptions = permissionsOptions;

  permissions = signal(privatePermissionOption);
  title = signal('');

  collaborators = signal<User[]>([]);

  isLoading = signal<boolean>(false);

  isCreateBtnDisabled = computed(() => {
    return (
      !this.title() ||
      (this.permissions().value === 'shared' &&
        this.collaborators().length === 0) ||
      this.isLoading()
    );
  });

  setPermissions(permissions?: PermissionOption | PermissionOption[]) {
    if (!permissions) {
      return;
    }

    if (Array.isArray(permissions)) {
      this.permissions.set(permissions[0]);
    } else {
      this.permissions.set(permissions);
    }
  }

  async createItem() {
    this.isLoading.set(true);

    if (this.permissions().value === 'private') {
      await firstValueFrom(
        this.trpc.workspaces.createPrivate.mutate({ title: this.title() }),
      );
    }

    if (this.permissions().value === 'shared') {
      await firstValueFrom(
        this.trpc.workspaces.createShared.mutate({
          title: this.title(),
          collaborators: this.collaborators(),
        }),
      );
    }

    this.isLoading.set(false);
  }

  addCollaborator(user: User) {
    this.collaborators.update((collaborators) => [...collaborators, user]);
  }

  removeCollaborator(user: User) {
    this.collaborators.update((collaborators) => [
      ...collaborators.filter((c) => c.id !== user.id),
    ]);
  }
}
