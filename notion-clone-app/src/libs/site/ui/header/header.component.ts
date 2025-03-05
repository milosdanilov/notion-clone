import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'nc-header',
  imports: [HlmButtonDirective, RouterLink],
  template: `
    <header class="p-4 flex justify-center items-center">
      <a routerLink="/" class="w-full flex gap-2 justify-left items-center">
        <img
          src="/assets/cypresslogo.svg"
          alt="Cypress logo"
          width="25"
          height="25" />
        <span class="font-semibold dark:text-white">cypress.</span>
      </a>
      <aside class="flex w-full gap-2 justify-end">
        <a routerLink="/login">
          <button hlmBtn variant="btn-secondary" class="p-1 hidden sm:block"
            >Login</button
          >
        </a>
        <a routerLink="/signup">
          <button hlmBtn variant="btn-primary" class="whitespace-nowrap"
            >Sign Up</button
          >
        </a>
      </aside>
    </header>
  `,
})
export class HeaderComponent {}
