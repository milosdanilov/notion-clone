import { Component, computed, signal } from '@angular/core';

import { FormAction } from '@analogjs/router';

import { lucideLoaderCircle, lucideMailCheck } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

import {
  HlmErrorDirective,
  HlmFormFieldComponent,
} from '@spartan-ng/ui-formfield-helm';

import {
  HlmAlertDirective,
  HlmAlertIconDirective,
} from '@spartan-ng/ui-alert-helm';

import { clsx } from 'clsx';
import { z } from 'zod';

import { SignUpFormSchema } from '@/auth';

export type SignUpFormErrors = z.inferFlattenedErrors<
  typeof SignUpFormSchema
>['fieldErrors'];

export type SignUpSubmitError = string;

@Component({
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    HlmFormFieldComponent,
    HlmInputDirective,
    HlmErrorDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    FormAction,
  ],
  providers: [provideIcons({ lucideLoaderCircle, lucideMailCheck })],
  template: `
    <form
      method="post"
      class="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      (onSuccess)="onSignUpSuccess()"
      (onError)="onSignUpError($any($event))"
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

      @if (!confirmation() && !codeExchangeError()) {
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

      <hlm-form-field>
        <input
          hlmInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          [disabled]="isLoading()" />
      </hlm-form-field>
      @if (submitError()) {
      <hlm-error>{{ submitError() }}</hlm-error>
      }
      <button hlmBtn type="submit" class="w-full p-6" [disabled]="isLoading()">
        @if (!isLoading()) {
        <span>Create Account</span>
        } @else {
        <hlm-icon
          name="lucideLoaderCircle"
          size="sm"
          class="mr-2 animate-spin" />
        }
      </button>
      }

      <span class="self-container"
        >Already have an account?
        <a href="/login" class="text-primary">Login</a>
      </span>

      @if (confirmation()) {
      <div hlmAlert [class]="confirmationAndErrorStyles()">
        <hlm-icon hlmAlertIcon name="lucideMailCheck" />
        <h4 hlmAlertTitle>Check your email.</h4>
        <p hlmAlertDesc>An email confirmation has been sent.</p>
      </div>
      } @else if (codeExchangeError()) {
      <div hlmAlert [class]="confirmationAndErrorStyles()">
        <h4 hlmAlertTitle>Invalid Link</h4>
        <p hlmAlertDesc>{{ codeExchangeError() }}</p>
      </div>
      }
    </form>
  `,
  host: {
    class: 'flex',
  },
})
export default class SignUpPageComponent {
  isLoading = signal<boolean>(false);
  submitError = signal<SignUpSubmitError>('');

  confirmation = signal<boolean>(false);
  // TODO: need a proper code exchange error logic
  codeExchangeError = signal<string>('');

  confirmationAndErrorStyles = computed(() =>
    clsx('bg-primary', {
      'bg-red-500/10': this.codeExchangeError(),
      'border-red-500/50': this.codeExchangeError(),
      'text-red-700': this.codeExchangeError(),
    })
  );

  onSignUpError(errors: SignUpFormErrors | SignUpSubmitError) {
    const err =
      typeof errors === 'string'
        ? errors
        : Object.values(errors)
            .reduce((allErr, currErr) => [...allErr, ...currErr], [])
            .join(', ');

    this.submitError.set(err);
  }

  onSignUpSuccess() {
    this.confirmation.set(true);
  }

  onFormStateChange(state: string) {
    if (state === 'submitting') {
      this.isLoading.set(true);
      this.clearState();
    } else {
      this.isLoading.set(false);
    }
  }

  private clearState() {
    this.submitError.set('');
    this.confirmation.set(false);
  }
}
