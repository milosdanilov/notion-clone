import { LoadResult } from '@analogjs/router';
import { Component, effect, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthStore } from '@notion-clone/auth';

import { load } from './dashboard.server';

@Component({
  selector: 'nc-dashboard-layout-page',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class DashboardLayoutPageComponent {
  private authStore = inject(AuthStore);

  load = input<LoadResult<typeof load>>();

  constructor() {
    effect(() => {
      const user = this.load();

      if (!user) {
        console.log('No user');
      } else {
        this.authStore.setUser(user);
      }
    });
  }
}
