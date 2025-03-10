import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-dialog-header',
  standalone: true,
  template: ` <ng-content /> `,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmDialogHeaderComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm('flex flex-col space-y-1.5 text-center sm:text-left', this.userClass()),
  );
}
