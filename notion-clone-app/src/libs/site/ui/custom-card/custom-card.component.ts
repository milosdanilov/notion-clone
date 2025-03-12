import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardContentDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/ui-card-helm';
import { ClassValue, ClassDictionary } from 'clsx';
import { hlm } from '@spartan-ng/brain/core';
import { cva } from 'class-variance-authority';

@Component({
  selector: 'nc-custom-card',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
  ],
  templateUrl: './custom-card.component.html',
})
export class CustomCardComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  public readonly userNgClass = input<ClassDictionary>(
    {},
    // eslint-disable-next-line @angular-eslint/no-input-rename
    { alias: 'ngClass' },
  );

  protected _computedClass = computed(() => {
    return hlm(cva('w-[380px]'), this.userClass(), this.userNgClass());
  });
}
