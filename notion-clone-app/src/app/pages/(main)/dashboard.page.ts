import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'nc-dashboard-layout-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class DashboardLayoutPageComponent {}
