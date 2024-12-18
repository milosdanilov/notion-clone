import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardTitleDirective } from '@spartan-ng/ui-card-helm';

import { PRICING_CARDS, PRICING_PLANS, USERS } from '../../../libs/constants';

import { TitleSectionComponent } from '../../../libs/components/landing-page/title-section.component';

import {
  Logo,
  LogoCarouselComponent,
} from '../../../libs/components/logo-carousel/logo-carousel.component';

import { CustomCardComponent } from '../../../libs/components/landing-page/custom-card/custom-card.component';
import { TestemonialsComponent } from '../../../libs/features/site/testemonials/testemonials.component';

@Component({
  standalone: true,
  imports: [
    TitleSectionComponent,
    HlmButtonDirective,
    LogoCarouselComponent,
    NgClass,
    CustomCardComponent,
    HlmCardTitleDirective,
    TestemonialsComponent,
  ],
  selector: 'nc-site-home-page',
  template: `
    <section
      class="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
      <nc-title-section
        pill="✨ Your Workspace, Perfected"
        title="All-In-One Collaboration and Productivity Platform" />
      <div
        class="bg-white p-[2px] mt-[6] rounded-xl bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px]">
        <button
          hlmBtn
          variant="secondary"
          class="w-full rounded-[10px] p-6 text-2xl bg-background"
          >Get Cypress Free</button
        >
      </div>
      <div
        class="md:mt-[-90px] sm:w-full w-[750px] flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-50px]">
        <img src="assets/appBanner.png" alt="Application Banner" />
        <div
          class="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
      </div>
    </section>

    <section class="relative">
      <nc-logo-carousel [logos]="clients" />
    </section>

    <section
      class="px-4 sm:px-6 flex justify-center items-center flex-col relative">
      <div
        class="w-[30%] blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-22"></div>
      <nc-title-section
        title="Keep track of your meetings, all in one place"
        subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
        pill="Features" />
      <div
        class="mt-10 max-w-[450px] flex justify-center items-center relative sm:ml-0 rounded-2xl border-8 border-washed-purple-300 border-opacity-10">
        <img src="assets/cal.png" alt="Banner" class="rounded-2xl" />
      </div>
    </section>

    <section class="relative">
      <div
        class="w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-56"></div>
      <div class="mt-20 px-4 sm-px-6 overflow-x-hidden overflow-visible">
        <nc-title-section
          title="Trusted by all"
          subheading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs."
          pill="Testemonials" />
        <div class="flex flex-col">
          <nc-testemonials
            class="mt-10 flex flex-nowrap gap-6 self-start hover:paused animate-[slide_250s_linear_infinite]"
            [users]="users" />
          <nc-testemonials
            class="mt-10 flex flex-nowrap gap-6 self-start hover:paused flex-row-reverse animate-[slide_250s_linear_infinite_reverse] ml-[100vw]"
            [users]="users" />
        </div>
      </div>
    </section>

    <section class="mt-20 px-4 sm:px-6">
      <nc-title-section
        title="The Perfect Plan For You"
        subheading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
        pill="Pricing" />
      <div
        class="flex flex-col-reverse sm:flex-row gap-4 justify-center sm:items-stretch items-center mt-10">
        @for (card of pricingCards; track $index) {
        <nc-custom-card
          class="w-[300px] rounded-2xl dark:bg-black/40 background-blur-3xl relative"
          [ngClass]="{
            'border-brand-primaryPurple/70':
              card.planType === pricingPlans.proplan
          }">
          <div ncCustomCardHeader>
            <div hlmCardTitle class="text-2xl font-semibold">
              @if (card.planType === pricingPlans.proplan) {
              <div
                class="hidden dark:block w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/80 -z-10 top-0">
              </div>
              <img
                src="assets/icons/diamond.svg"
                alt="Pro Plan Icon"
                class="absolute top-6 right-6" />
              }
              {{ card.planType }}
            </div>
          </div>
          <div ncCustomCardContent class="p-0">
            <span class="font-normal text-2xl">\${{ card.price }}</span>
            @if (+card.price > 0) {
            <span class="dark:text-washed-purple-800 ml-1">/mo</span>
            }
            <p class="dark:text-washed-purple-800">{{ card.description }}</p>
            <button variant="btn-primary" class="whitespace-nowrap w-full mt-4">
              {{
                card.planType === pricingPlans.proplan
                  ? 'Go Pro'
                  : 'Get Started'
              }}
            </button>
          </div>
          <div ncCustomCardFooter>
            <ul class="font-normal flex mb-2 flex-col gap-4">
              <small>{{ card.highlightFeature }}</small>
              @for (feature of card.freatures; track $index) {
              <li class="flex items-center gap-2">
                <img src="assets/icons/check.svg" alt="Check Icon" />
                {{ feature }}
              </li>
              }
            </ul>
          </div>
        </nc-custom-card>
        }
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

  users = USERS;
  pricingCards = PRICING_CARDS;
  pricingPlans = PRICING_PLANS;
}
