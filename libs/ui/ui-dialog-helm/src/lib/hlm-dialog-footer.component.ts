import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-dialog-footer',
  standalone: true,
  template: ` <ng-content /> `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmDialogFooterComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      this.userClass(),
    ),
  );
}
