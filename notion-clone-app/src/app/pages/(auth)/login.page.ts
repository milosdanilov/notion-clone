import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconComponent,
  ],
  template: `
    <form
      [formGroup]="loginForm"
      (ngSubmit)="handleSubmit($event)"
      class="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col">
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
          placeholder="Email"
          formControlName="email"
          [disabled]="isLoading" />
        <hlm-error>error</hlm-error>
      </hlm-form-field>

      <hlm-form-field>
        <input
          hlmInput
          type="password"
          placeholder="Password"
          formControlName="password"
          [disabled]="isLoading" />
        <hlm-error>error</hlm-error>
      </hlm-form-field>
      @if (submitError) {
      <hlm-error>{{ submitError }}</hlm-error>
      }
      <button
        hlmBtn
        type="submit"
        class="w-full p-6"
        size="lg"
        [disabled]="isLoading">
        @if (!isLoading) {
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
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.min(1)]),
  });

  submitError = '';

  isLoading = false;

  handleSubmit(event: unknown) {
    console.log('handleSubmit', event);
  }
}
