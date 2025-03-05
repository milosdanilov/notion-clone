import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingCard } from '../models/pricing-cards.model';

import { CustomCardComponent } from '../ui/custom-card/custom-card.component';

@Component({
  selector: 'nc-pricing-plans',
  imports: [CommonModule, CustomCardComponent],
  templateUrl: './pricing-plans.component.html',
})
export class PricingPlansComponent {
  @Input()
  pricingCards!: PricingCard[];
}
