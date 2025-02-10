import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@/site';

@Component({
  standalone: true,
  selector: 'nc-home-layout-page',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <nc-header />
    <router-outlet />
  `,
})
export default class HomeLayoutPageComponent {}
