import { Component, input } from '@angular/core';

import { DashboardSetupComponent } from '@/dashboard';
import { LoadResult } from '@analogjs/router';

import { load } from './dashboard.server';

@Component({
  selector: 'nc-main-dashboard-page',
  standalone: true,
  imports: [DashboardSetupComponent],
  template: `
    <div class="bg-background">
      <nc-dashboard-setup
        class="h-screen w-screen flex justify-center items-center"
        [user]="load()?.user"
        [subscription]="load()?.subscription"></nc-dashboard-setup>
    </div>
  `,
})
export default class DashboardPageComponent {
  load = input<LoadResult<typeof load>>();
}
