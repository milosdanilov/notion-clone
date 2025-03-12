import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

export const cardTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight',
  {
    variants: {},
    defaultVariants: {},
  },
);
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;

@Directive({
  selector: '[hlmCardTitle]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardTitleDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(cardTitleVariants(), this.userClass()),
  );
}
