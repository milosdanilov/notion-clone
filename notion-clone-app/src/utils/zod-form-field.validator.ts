import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { z } from 'zod';

export function zodValidator<T>(schema: z.Schema<T>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validated = schema.safeParse(control.value);

    if (validated.success) {
      return null;
    }

    const aggregatedErrors = validated.error.format() as {
      [key: string]: { _errors: string[] };
    };

    const form = control as FormGroup;

    if (!form.controls) {
      return null;
    }

    Object.keys(form.controls).forEach((ctrlKey) => {
      const ctrl = form.controls[ctrlKey];

      if (ctrlKey in aggregatedErrors) {
        const ctrlError = aggregatedErrors[ctrlKey];
        ctrl && ctrl.setErrors({ zodError: ctrlError._errors[0] });
      } else {
        ctrl && ctrl.setErrors(null);
      }
    });

    return aggregatedErrors;
  };
}
