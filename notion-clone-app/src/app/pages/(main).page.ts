import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'nc-main-layout-page',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class MainLayoutPageComponent {}
