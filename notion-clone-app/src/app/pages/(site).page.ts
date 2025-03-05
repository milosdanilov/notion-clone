import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { HeaderComponent } from '@/site';

@Component({
  selector: 'nc-home-layout-page',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <nc-header />
    <router-outlet />
  `,
})
export default class HomeLayoutPageComponent {}
