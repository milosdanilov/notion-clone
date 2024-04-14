import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'notion-clone-app-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <notion-clone-app-analog-welcome/>
  `,
})
export default class HomeComponent {
}
