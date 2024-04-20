import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { ThemeService } from "@/libs/theme/theme.service";

@Component({
  selector: 'notion-clone-app-root',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet],
  host: {
    class:
      'block h-full bg-zinc-50 text-zinc-900 dark:text-zinc-50 dark:bg-zinc-900',
  },
  template: ` 
  <header class="p-4">
  <button (click)="toggleTheme()">Toggle theme</button>
  </header>
  <router-outlet></router-outlet> `,
})
export class AppComponent {
  private _themeService = inject(ThemeService);

  public toggleTheme(): void {
    this._themeService.toggleDarkMode();
  }
}