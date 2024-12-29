export type PlanType = 'proplan' | 'freeplan';

export interface PricingCard {
  planType: PlanType;
  price: string;
  description: string;
  highlightFeature: string;
  freatures: string[];
}
