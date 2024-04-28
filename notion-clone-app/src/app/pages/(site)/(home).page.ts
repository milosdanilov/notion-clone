import { Component } from '@angular/core';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { TitleSectionComponent } from '../../../libs/components/landing-page/title-section.component';

@Component({
  standalone: true,
  imports: [TitleSectionComponent, HlmButtonDirective],
  template: `
    <section>
      <div
        class="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center"
      ></div>
      <nc-title-section
        pill="✨ Your Workspace, Perfected"
        title="All-In-One Collaboration and Productivity Platform"
      ></nc-title-section>
      <div
        class="bg-white p-[2px] mt-6 rounded-xl bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px]"
      >
        <button hlmBtn variant="secondary" class="w-full rounded-[10px] p-6 text-2xl bg-background">Get Cypress Free</button>
      </div>
    </section>
  `,
})
export default class HomePage {}
