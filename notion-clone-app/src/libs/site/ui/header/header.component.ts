import { Component } from '@angular/core';

@Component({
  selector: 'nc-header',
  standalone: true,
  template: `
    <header class="p-4 flex justify-center items-center">
      <a href="/" class="w-full flex gap-2 justify-left items-center">
        <img
          src="/assets/cypresslogo.svg"
          alt="Cypress logo"
          width="25"
          height="25" />
        <span class="font-semibold dark:text-white">cypress.</span>
      </a>
    </header>
  `,
})
export class HeaderComponent {}
