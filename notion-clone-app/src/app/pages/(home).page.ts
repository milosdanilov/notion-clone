import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ThemeService } from "@/libs/theme/theme.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  host: {
    class: 'block'
  },
  template: `
    <div class="flex p-12 gap-8 items-center justify-center">
    <img class="h-20 w-20" src="/assets/analog.svg"/>
    <div class='w-[1px] h-14 dark:bg-zinc-50 bg-zinc-900'></div>
    <img class="h-20 w-20" src="/assets/tailwind.svg"/>
    </div>
    <h2 class="text-2xl text-center">Analog + Tailwind: Darkmode</h2>
    <p class="mt-2 text-center">Current theme: {{theme$ | async}}</p>
  `,
})
export default class HomeComponent {
  private _themeService = inject(ThemeService);
  public theme$ = this._themeService.theme$;
}