import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardContentDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/ui-card-helm';
import { ClassValue, ClassDictionary } from 'clsx';
import { hlm } from '@spartan-ng/ui-core';
import { cva } from 'class-variance-authority';

@Component({
  selector: 'nc-custom-card',
  standalone: true,
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
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  public readonly userNgClass = input<ClassDictionary>(
    {},
    { alias: 'ngClass' }
  );

  protected _computedClass = computed(() => {
    console.log(this.userNgClass());
    return hlm(cva('w-[380px]'), this.userClass(), this.userNgClass());
  });
}
