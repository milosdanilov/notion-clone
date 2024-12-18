import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

import { CustomCardComponent } from '../../../components/landing-page/custom-card/custom-card.component';

@Component({
  selector: 'nc-testemonials',
  standalone: true,
  imports: [
    CommonModule,
    CustomCardComponent,
    HlmAvatarComponent,
    HlmAvatarImageDirective,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './testemonials.component.html',
})
export class TestemonialsComponent {
  @Input()
  users!: { name: string; message: string }[];
}