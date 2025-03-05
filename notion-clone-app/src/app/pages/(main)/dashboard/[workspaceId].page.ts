import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'nc-workspace-layout-page',
  imports: [RouterOutlet],
  template: `
    <main class="flex overflow-hidden h-screen w-screen">
      <!-- <nc-sidebar></nc-sidebar> -->
      <div
        class="dark:border-Neutrals/neutrals-12/70 
        border-l-[1px] w-full relative overflow-scroll">
        <router-outlet />
      </div>
    </main>
  `,
})
export default class WorkspacePageLayoutComponent {}
