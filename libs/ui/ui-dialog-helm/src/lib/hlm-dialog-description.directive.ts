import { Directive, computed, input } from '@angular/core';
import { BrnDialogDescriptionDirective } from '@spartan-ng/brain/dialog';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmDialogDescription]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [BrnDialogDescriptionDirective],
})
export class HlmDialogDescriptionDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm('text-sm text-muted-foreground', this.userClass()),
  );
}
