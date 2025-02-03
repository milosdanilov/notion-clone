import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { FormAction } from '@analogjs/router';

import { AuthUser } from '@supabase/supabase-js';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import {
  HlmErrorDirective,
  HlmFormFieldComponent,
  HlmHintDirective,
} from '@spartan-ng/ui-formfield-helm';

import { provideIcons } from '@ng-icons/core';
import { lucideLoaderCircle } from '@ng-icons/lucide';

import { EmojiPickerComponent } from '@notion-clone/emoji-picker';
import { DisableCtrlDirective } from '@notion-clone/ui-utils';
import { Subscription } from '@notion-clone/supabase';

import { zodValidator } from '@/utils';

import { CreateWorkspaceFormSchema } from '../models/create-workspace-form.schema';

@Component({
  selector: 'nc-dashboard-setup',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmFormFieldComponent,
    HlmErrorDirective,
    HlmInputDirective,
    HlmHintDirective,
    HlmIconComponent,
    HlmButtonDirective,
    EmojiPickerComponent,
    ReactiveFormsModule,
    DisableCtrlDirective,
    FormAction,
  ],
  providers: [provideIcons({ lucideLoaderCircle })],
  template: `
    <section hlmCard class="w-[800px] h-screen sm:h-auto">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Create A Workspace</h3>
        <p hlmCardDescription>
          Lets create a private workspace to get you started. You can add
          collaborators later from the workspace settings tab.
        </p>
      </div>
      <div hlmCardContent>
        <form method="post" [formGroup]="form">
          <div class="flex flex-col gap-4">
            <div class="flex items-end gap-4">
              <div class="text-5xl">
                <ui-emoji-picker
                  id="workspaceEmoji"
                  name="workspaceEmoji"
                  formControlName="workspaceEmoji" />
              </div>
              <hlm-form-field class="w-full">
                <label
                  for="workspaceName"
                  class="text-sm text-muted-foreground">
                  Name
                </label>
                <input
                  hlmInput
                  id="workspaceName"
                  type="text"
                  name="workspaceName"
                  formControlName="workspaceName"
                  placeholder="Workspace Name"
                  class="bg-transparent"
                  [uiDisableCtrl]="isLoading()" />
                @if (form.controls.workspaceName.errors) {
                <hlm-error>
                  {{ form.controls.workspaceName.errors['zodError'] }}
                </hlm-error>
                }
              </hlm-form-field>
            </div>
            <hlm-form-field>
              <label for="logo" class="text-sm text-muted-foreground">
                Workspace Logo
              </label>
              <input
                hlmInput
                id="logo"
                type="file"
                accept="image/*"
                name="logo"
                formControlName="logo"
                class="bg-transparent"
                [uiDisableCtrl]="
                  isLoading() || subscription()?.status !== 'active'
                " />

              @if (form.controls.logo.errors) {
              <hlm-error>
                {{ form.controls.logo.errors['zodError'] }}
              </hlm-error>
              } @if (subscription()?.status !== 'active') {
              <hlm-hint class="text-muted-foreground block"
                >To customize your workspace, you need to be on a Pro
                Plan</hlm-hint
              >
              }
            </hlm-form-field>
            <div class="self-end">
              <button hlmBtn [disabled]="isLoading()" type="submit">
                @if (!isLoading()) {
                <span>Create Workspace</span>
                } @else {
                <hlm-icon
                  name="lucideLoaderCircle"
                  size="sm"
                  class="mr-2 animate-spin" />
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  `,
})
export class DashboardSetupComponent {
  private fb = inject(FormBuilder);

  subscription = input<Subscription | null>();
  user = input<AuthUser>();

  form = this.fb.group(
    {
      workspaceEmoji: ['💼'],
      workspaceName: [''],
      logo: [''],
    },
    { validators: zodValidator(CreateWorkspaceFormSchema) }
  );

  constructor() {
    this.form.valueChanges.subscribe((e) => console.log(e));
  }

  isLoading = signal<boolean>(false);
}
