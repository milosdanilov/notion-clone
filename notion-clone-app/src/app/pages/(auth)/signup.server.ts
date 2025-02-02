import {
  fail,
  json,
  type PageServerAction,
} from '@analogjs/router/server/actions';

import { readFormData } from 'h3';

import { SignUpFormSchema } from '@/auth';
import { createAuthClient } from '@/utils';

export async function action({ event }: PageServerAction) {
  const formData = await readFormData(event);
  const signUpFormData = Object.fromEntries(formData);

  const validatedSignUpFormData = SignUpFormSchema.safeParse(signUpFormData);

  if (!validatedSignUpFormData.success) {
    return fail(400, validatedSignUpFormData.error.flatten().fieldErrors);
  }

  const client = createAuthClient(event);

  const { email, password } = validatedSignUpFormData.data;

  if (await client.checkEmailExists(email)) {
    return fail(422, 'User already exists');
  }

  const { data, error } = await client.signUp(
    email,
    password,
    `${import.meta.env['VITE_PUBLIC_SITE_URL']}/confirm`
  );

  if (error) {
    return fail(error.status || 400, error.message);
  }

  return json(data);
}
