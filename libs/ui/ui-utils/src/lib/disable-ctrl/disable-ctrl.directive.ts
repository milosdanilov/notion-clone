import { Directive, inject, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[uiDisableCtrl]',
  standalone: true,
})
export class DisableCtrlDirective {
  private ngControl = inject(NgControl);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('uiDisableCtrl')
  set disableCtrl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control && this.ngControl.control[action]();
  }
}
