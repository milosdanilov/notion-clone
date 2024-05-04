import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'nc-app-root',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
