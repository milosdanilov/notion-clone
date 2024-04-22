import { Component } from '@angular/core';

import { TitleSectionComponent } from '../../../libs/components/landing-page/title-section.component';

@Component({
  standalone: true,
  imports: [TitleSectionComponent],
  template: `
    <section>
      <div
        class="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center"
      ></div>
      <nc-title-section
        pill="✨ Your Workspace, Perfected"
        title="All-In-One Collaboration and Productivity Platform"
      ></nc-title-section>
    </section>
  `,
})
export default class HomePage {}
