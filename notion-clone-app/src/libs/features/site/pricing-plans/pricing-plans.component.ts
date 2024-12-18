import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingCard } from '../../../models/pricing-cards';

import { CustomCardComponent } from '../../../../libs/components/landing-page/custom-card/custom-card.component';

@Component({
  selector: 'nc-pricing-plans',
  standalone: true,
  imports: [CommonModule, CustomCardComponent],
  templateUrl: './pricing-plans.component.html',
})
export class PricingPlansComponent {
  @Input()
  pricingCards!: PricingCard[];
}
