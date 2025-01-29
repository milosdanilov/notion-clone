import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { render } from '@testing-library/angular';

import { DisableCtrlDirective } from './disable-ctrl.directive';

@Component({
  selector: 'ui-test-disable-ctrl-input-mock',
  imports: [ReactiveFormsModule, DisableCtrlDirective],
  template: `
    <input type="text" [formControl]="testCtrl" [uiDisableCtrl]="disabled" />
  `,
  standalone: true,
})
class DisableCtrlInputMockComponent {
  testCtrl = new FormControl('');
  disabled = false;
}

describe('DisableCtrlDirective', () => {
  it('should create an instance', async () => {
    const comp = await render(DisableCtrlInputMockComponent);
    expect(comp.fixture.componentInstance).toBeTruthy();
  });
});
