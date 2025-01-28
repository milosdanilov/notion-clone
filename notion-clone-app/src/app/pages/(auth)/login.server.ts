import {
  redirect,
  type PageServerAction,
  fail,
} from '@analogjs/router/server/actions';

import { readFormData } from 'h3';

import { createServerClient, LoginFormScheme } from '@/auth';
import { z } from 'zod';

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
      validatedLoginFormData.error.flatten().fieldErrors
    );
  }

  const client = createServerClient(event);

  const { email, password } = validatedLoginFormData.data;

  const { error } = await client.login(email, password);

  if (error) {
    return fail<LoginSubmitErrors>(error.status || 400, {
      auth: [error.message],
    });
  }

  return redirect('/dashboard');
}
