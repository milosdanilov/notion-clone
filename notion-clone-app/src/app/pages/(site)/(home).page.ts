import { Component } from '@angular/core';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { TitleSectionComponent } from '../../../libs/components/landing-page/title-section.component';
import {
  Logo,
  LogoCarouselComponent,
} from '../../../libs/components/logo-carousel/logo-carousel.component';

@Component({
  standalone: true,
  imports: [TitleSectionComponent, HlmButtonDirective, LogoCarouselComponent],
  template: `
    <section
      class="overflow-hidden 
      px-4 
      sm:px-6 
      mt-10 
      sm:flex 
      sm:flex-col 
      gap-4 
      md:justify-center 
      md:items-center"
    >
      <nc-title-section
        pill="✨ Your Workspace, Perfected"
        title="All-In-One Collaboration and Productivity Platform"
      />
      <div
        class="bg-white 
        p-[2px] 
        mt-[6] 
        rounded-xl 
        bg-gradient-to-r 
        from-primary 
        to-brand-primaryBlue 
        sm:w-[300px]"
      >
        <button
          hlmBtn
          variant="secondary"
          class="w-full 
          rounded-[10px] 
          p-6 
          text-2xl 
          bg-background"
          >Get Cypress Free</button
        >
      </div>
      <div
        class="md:mt-[-90px] 
        sm:w-full 
        w-[750px] 
        flex 
        justify-center 
        items-center 
        mt-[-40px] 
        relative 
        sm:ml-0 
        ml-[-50px]"
      >
        <img
          src="assets/appBanner.png"
          alt="Application Banner"
        />
        <div
          class="bottom-0 
          top-[50%] 
          bg-gradient-to-t 
          dark:from-background 
          left-0 
          right-0 
          absolute 
          z-10"
        >
        </div>
      </div>
    </section>
    <section class="relative">
      <nc-logo-carousel [logos]="clients" />
    </section>
    <section
      class="px-4 
      sm:px-6
      flex
      justify-center
      items-center
      flex-col
      relative"
    >
      <div
        class="w-[30%]
        blur-[120px]
        rounded-full
        h-32
        absolute
        bg-brand-primaryPurple/50
        -z-10
        top-22"
      >
      </div>
      <nc-title-section
        title="Keep track of your meetings, all in one place"
        subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
        pill="Features"
      />
      <div
        class="mt-10 
        max-w-[450px] 
        flex
        justify-center
        items-center
        relative
        sm:ml-0
        rounded-2xl
        border-8
        border-washed-purple-300
        border-opacity-10"
      >
        <img
          src="assets/cal.png"
          alt="Banner"
          class="rounded-2xl"
        />
      </div>
    </section>
  `,
})
export default class HomePage {
  clients: Logo[] = [
    { alt: 'client1', logo: 'assets/client1.png' },
    { alt: 'client2', logo: 'assets/client2.png' },
    { alt: 'client3', logo: 'assets/client3.png' },
    { alt: 'client4', logo: 'assets/client4.png' },
    { alt: 'client5', logo: 'assets/client5.png' },
  ];
}
