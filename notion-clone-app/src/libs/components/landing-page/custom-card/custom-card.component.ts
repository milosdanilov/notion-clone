import { Component, Input } from '@angular/core';
import { CommonModule, LowerCasePipe } from '@angular/common';

import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardContentDirective,
  HlmCardFooterDirective,
  HlmCardTitleDirective,
  HlmCardDescriptionDirective,
} from '@spartan-ng/ui-card-helm';

import {
  HlmAvatarComponent,
  HlmAvatarImageDirective,
  HlmAvatarFallbackDirective,
} from '@spartan-ng/ui-avatar-helm';

export interface CustomCardContent {
  name: string;
  message: string;
}

@Component({
  selector: 'nc-custom-card',
  standalone: true,
  imports: [
    CommonModule,
    LowerCasePipe,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmAvatarComponent,
    HlmAvatarImageDirective,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.css',
})
export class CustomCardComponent {
  @Input()
  name!: string;

  @Input()
  message!: string;

  @Input()
  avatarUrl!: string;
}
