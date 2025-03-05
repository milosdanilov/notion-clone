import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

import { CustomCardComponent } from '../ui/custom-card/custom-card.component';

@Component({
  selector: 'nc-testemonials',
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
