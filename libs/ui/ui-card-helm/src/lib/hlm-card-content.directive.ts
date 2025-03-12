import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

export const cardContentVariants = cva('p-6 pt-0', {
  variants: {},
  defaultVariants: {},
});
export type CardContentVariants = VariantProps<typeof cardContentVariants>;

@Directive({
  selector: '[hlmCardContent]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardContentDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(cardContentVariants(), this.userClass()),
  );
}
