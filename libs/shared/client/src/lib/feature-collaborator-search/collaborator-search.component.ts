import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthUser } from '@supabase/supabase-js';

import { debounceTime, Subject, switchMap } from 'rxjs';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

import { User } from '@notion-clone/supabase';

import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/brain/sheet';

import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';

import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmScrollAreaDirective } from '@spartan-ng/ui-scrollarea-helm';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

import { injectTrpcClient } from '@notion-clone/api/client';

@Component({
  selector: 'lib-collaborator-search',
  imports: [
    CommonModule,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetDescriptionDirective,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    NgIcon,
    HlmIconDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmScrollAreaDirective,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  template: `
    <hlm-sheet>
      <div class="w-full flex items-center justify-center">
        <button
          hlmBtn
          brnSheetTrigger
          side="right"
          type="button"
          class="text-sm mt-4">
          <ng-content select="sheet-trigger"></ng-content>
        </button>
      </div>
      <hlm-sheet-content
        *brnSheetContent="let ctx"
        className="w-[400px] sm:w-[540px]">
        <hlm-sheet-header>
          <h3 hlmSheetTitle>Search Collaborator</h3>
          <p hlmSheetDescription class="text-sm text-muted-foreground">
            You can also remove collaborators after adding them from the
            settings tab.
          </p>
        </hlm-sheet-header>
        <div class="flex justify-center items-center gap-2 mt-2">
          <ng-icon hlm name="lucideSearch" />
          <input
            #nameInput
            hlmInput
            name="name"
            class="dark:bg-background"
            placeholder="Email"
            (input)="onChange(nameInput.value)" />
        </div>
        <ng-scrollbar hlm class="mt-6 overflow-y-scroll w-full rounded-md">
          @for (user of filteredResults(); track $index) {
            <div class="p-4 flex justify-between items-center">
              <div class="flex gap-4 items-center">
                <hlm-avatar class="w-8 h-8">
                  <img src="/assets/avatars/7.png" hlmAvatarImage />
                  <span class="text-white bg-destructive" hlmAvatarFallback>
                    CP
                  </span>
                </hlm-avatar>
                <div
                  class="text-sm gap-2 overflow-hidden overflow-ellipsis 
                  w-[180px] text-muted-foreground">
                  {{ user.email }}
                </div>
              </div>
              <button
                hlmBtn
                variant="secondary"
                (click)="addCollaborator.emit(user)">
                Add
              </button>
            </div>
          }
        </ng-scrollbar>
      </hlm-sheet-content>
    </hlm-sheet>
  `,
  providers: [provideIcons({ lucideSearch })],
})
export class CollaboratorSearchComponent {
  trpc = injectTrpcClient();

  user = input<AuthUser>();
  existingCollaborators = input<User[]>([]);
  addCollaborator = output<User>();

  private searchResults = signal<User[]>([]);
  private emailChange = new Subject<string>();

  constructor() {
    this.emailChange
      .pipe(
        debounceTime(450),
        switchMap((email) => {
          return this.trpc.users.search.query(email);
        }),
      )
      .subscribe({
        next: (users) => this.searchResults.set(users as User[]),
      });
  }

  filteredResults = computed(() => {
    const collaboratorExists = (id: string) =>
      this.existingCollaborators().some((e) => e.id === id);

    const isCurrentUser = (id: string) => this.user()?.id === id;

    return this.searchResults()
      .filter((res) => !collaboratorExists(res.id))
      .filter((res) => !isCurrentUser(res.id));
  });

  onChange(email: string) {
    this.emailChange.next(email);
  }
}
