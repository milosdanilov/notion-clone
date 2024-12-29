import { Component, signal } from '@angular/core';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { FormAction } from '@analogjs/router';
import { z } from 'zod';

import { LoginFormScheme } from '@/libs/domain/auth/types';

export type LoginFormErrors = z.inferFlattenedErrors<
  typeof LoginFormScheme
>['fieldErrors'];

export type LoginSubmitError = string;

@Component({
  standalone: true,
  imports: [
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconComponent,
    FormAction,
  ],
  template: `
    <form
      method="post"
      class="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      (onSuccess)="onLoginSuccess()"
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
          type="text"
          name="email"
          placeholder="Email"
          [disabled]="isLoading()" />
      </hlm-form-field>

      <hlm-form-field>
        <input
          hlmInput
          type="password"
          name="password"
          placeholder="Password"
          [disabled]="isLoading()" />
      </hlm-form-field>
      @if (submitError()) {
      <hlm-error>{{ submitError() }}</hlm-error>
      }
      <button
        hlmBtn
        type="submit"
        class="w-full p-6"
        size="lg"
        [disabled]="isLoading()">
        @if (!isLoading()) {
        <span>Login</span>
        } @else {
        <hlm-icon
          name="lucideLoaderCircle"
          size="sm"
          class="mr-2 animate-spin" />
        }
      </button>
      <span class="self-center"
        >Don't have an account?
        <a href="/signup" class="text-primary">Sign Up</a>
      </span>
    </form>
  `,
  host: {
    class: 'flex',
  },
})
export default class LoginPage {
  isLoading = signal<boolean>(false);
  submitError = signal<LoginSubmitError>('');

  onLoginError(errors: LoginFormErrors | LoginSubmitError) {
    const err =
      typeof errors === 'string'
        ? errors
        : Object.values(errors)
            .reduce((allErr, currErr) => [...allErr, ...currErr], [])
            .join(', ');

    this.submitError.set(err);
  }

  onLoginSuccess() {
    console.log('onLoginSuccess');
  }

  onFormStateChange(state: string) {
    if (state === 'submitting') {
      this.isLoading.set(true);
      this.submitError.set('');
    } else {
      this.isLoading.set(false);
    }
  }
}
