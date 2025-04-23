import {
  redirect,
  type PageServerAction,
  fail,
} from '@analogjs/router/server/actions';

import { readFormData } from 'h3';
import { z } from 'zod';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoginFormScheme } from '@/auth';

export type LoginSubmitErrors = Partial<
  z.inferFlattenedErrors<typeof LoginFormScheme>['fieldErrors'] & {
    auth: string[];
  }
>;

export async function action({ event }: PageServerAction) {
  const formData = await readFormData(event);
  const loginFormData = Object.fromEntries(formData);

  const validatedLoginFormData = LoginFormScheme.safeParse(loginFormData);

  if (!validatedLoginFormData.success) {
    return fail<LoginSubmitErrors>(
      422,
      validatedLoginFormData.error.flatten().fieldErrors,
    );
  }

  const authClient = event.context.authClient;

  const { email, password } = validatedLoginFormData.data;

  const { error } = await authClient.authenticate(email, password);

  if (error) {
    return fail<LoginSubmitErrors>(error.status || 400, {
      auth: [error.message],
    });
  }

  return redirect('/dashboard');
}
