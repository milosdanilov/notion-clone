import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'nc-app-root',
  imports: [RouterOutlet, HlmToasterComponent],
  template: `
    <main>
      <router-outlet></router-outlet>
      <hlm-toaster />
    </main>
  `,
})
export class AppComponent {}
