import {
  redirect,
  type PageServerAction,
  fail,
} from '@analogjs/router/server/actions';

import { readFormData } from 'h3';

import { AuthClient, LoginFormScheme } from '@/auth';

export async function action({ event }: PageServerAction) {
  const formData = await readFormData(event);
  const loginFormData = Object.fromEntries(formData);

  const validatedLoginFormData = LoginFormScheme.safeParse(loginFormData);

  if (!validatedLoginFormData.success) {
    return fail(400, validatedLoginFormData.error.flatten().fieldErrors);
  }

  const client = new AuthClient();

  const { email, password } = validatedLoginFormData.data;

  const { error } = await client.login(email, password);

  if (error) {
    return fail(error.status || 400, error.message);
  }

  return redirect('/');
}
