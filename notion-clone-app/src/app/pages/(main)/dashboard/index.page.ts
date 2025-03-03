import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FormAction, LoadResult } from '@analogjs/router';

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

import { HlmToasterService } from '@spartan-ng/ui-sonner-helm';

import { provideIcons } from '@ng-icons/core';
import { lucideLoaderCircle } from '@ng-icons/lucide';

import { EmojiPickerComponent } from '@notion-clone/emoji-picker';
import { DisableCtrlDirective } from '@notion-clone/ui-utils';

import { Subscription } from '@notion-clone/supabase';

import { zodValidator } from '@/utils';
import { CreateWorkspaceFormSchema } from '@/dashboard';

import {
  type CreateWorkspaceSubmitErrors,
  type CreateWorkspaceSuccessRes,
  load,
} from './index.server';

@Component({
  selector: 'nc-main-dashboard-page',
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
  template: `
    <div
      class="bg-background h-screen w-screen flex justify-center items-center">
      <section hlmCard class="w-[800px] h-screen sm:h-auto">
        <div hlmCardHeader>
          <h3 hlmCardTitle>Create A Workspace</h3>
          <p hlmCardDescription>
            Lets create a private workspace to get you started. You can add
            collaborators later from the workspace settings tab.
          </p>
        </div>
        <div hlmCardContent>
          <form
            method="post"
            [formGroup]="form"
            (onSuccess)="onCreateWorkspaceSuccess($any($event))"
            (onError)="onCreateWorkspaceError($any($event))">
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
    </div>
  `,
  providers: [provideIcons({ lucideLoaderCircle })],
})
export default class DashboardPageComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(HlmToasterService);
  private router = inject(Router);

  load = input<LoadResult<typeof load>>();

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

  isLoading = signal<boolean>(false);

  onCreateWorkspaceSuccess(res: CreateWorkspaceSuccessRes) {
    this.toastService.toast('Workspace Created', {
      description: `${res.workspace.title} has been created successfully.`,
    });

    // TODO: add workspace to state

    this.router.navigate(['dashboard', `${res.workspace.id}`]);
  }

  onCreateWorkspaceError(errors: CreateWorkspaceSubmitErrors) {
    console.log(errors);
    const error = errors.generalError
      ? errors.generalError.join('')
      : `Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.`;

    this.toastService.error('Could not create your workspace', {
      description: error,
    });
  }
}
