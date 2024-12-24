import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="h-screen p-6 flex justify-center">
      <router-outlet></router-outlet>
    </div>
  `,
})
export default class AuthLayoutPage {}
