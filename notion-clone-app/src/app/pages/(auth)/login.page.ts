import { NgIcon } from '@ng-icons/core';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormAction } from '@analogjs/router';

import { provideIcons } from '@ng-icons/core';
import { lucideLoaderCircle } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

import { DisableCtrlDirective } from '@notion-clone/ui-utils';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoginFormScheme } from '@/auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { zodValidator } from '@/utils';

import { type LoginSubmitErrors } from './login.server';

@Component({
  imports: [
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    FormAction,
    ReactiveFormsModule,
    DisableCtrlDirective,
  ],
  providers: [provideIcons({ lucideLoaderCircle })],
  template: `
    <form
      method="post"
      [formGroup]="form"
      class="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      (onError)="onLoginError($any($event))"
      (state)="onFormStateChange($event)">
      <a href="/" class="w-full flex justify-left items-center">
        <img
          src="/assets/cypresslogo.svg"
          alt="cypres logo"
          width="50"
          height="50" />
        <span class="font-semibold dark:text-white text-4xl first-letter:ml-2"
          >cypress.
        </span>
      </a>
      <p class="text-foreground/60">
        An all-In-One Collaboration and Productivity Platform
      </p>
      <hlm-form-field>
        <input
          hlmInput
          formControlName="email"
          type="text"
          name="email"
          placeholder="Email"
          [uiDisableCtrl]="isLoading()" />
        @if (form.controls.email.errors) {
          <hlm-error>{{ form.controls.email.errors['zodError'] }}</hlm-error>
        }
      </hlm-form-field>

      <hlm-form-field>
        <input
          hlmInput
          formControlName="password"
          type="password"
          name="password"
          placeholder="Password"
          [uiDisableCtrl]="isLoading()" />
        @if (form.controls.password.errors) {
          <hlm-error>{{ form.controls.password.errors['zodError'] }}</hlm-error>
        }
      </hlm-form-field>
      @if (submitError().auth) {
        <hlm-error>{{ submitError().auth }}</hlm-error>
      }
      <button
        hlmBtn
        type="submit"
        class="w-full p-6"
        size="lg"
        [disabled]="isLoading() || form.invalid">
        @if (!isLoading()) {
          <span>Login</span>
        } @else {
          <ng-icon
            hlm
            name="lucideLoaderCircle"
            size="sm"
            class="mr-2 animate-spin" />
        }
      </button>
      <span class="self-container"
        >Don't have an account?
        <a href="/signup" class="text-primary">Sign Up</a>
      </span>
    </form>
  `,
  host: {
    class: 'flex',
  },
})
export default class LoginPageComponent {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group(
    {
      email: [''],
      password: [''],
    },
    { validators: zodValidator(LoginFormScheme) },
  );

  isLoading = signal<boolean>(false);
  submitError = signal<LoginSubmitErrors>({});

  onLoginError(errors: LoginSubmitErrors) {
    this.submitError.set(errors);
  }

  onFormStateChange(state: string) {
    if (state === 'submitting') {
      this.isLoading.set(true);
      this.submitError.set({});
    } else {
      this.isLoading.set(false);
    }
  }
}
