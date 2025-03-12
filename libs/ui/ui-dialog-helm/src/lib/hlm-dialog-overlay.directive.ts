import { Directive, computed, effect, input, untracked } from '@angular/core';
import { hlm, injectCustomClassSettable } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmDialogOverlayClass =
  'bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';

@Directive({
  selector: '[hlmDialogOverlay],brn-dialog-overlay[hlm]',
  standalone: true,
})
export class HlmDialogOverlayDirective {
  private readonly _classSettable = injectCustomClassSettable({
    optional: true,
    host: true,
  });

  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(hlmDialogOverlayClass, this.userClass()),
  );

  constructor() {
    effect(() => {
      const newClass = this._computedClass();
      untracked(() => this._classSettable?.setClassToCustomElement(newClass));
    });
  }
}
