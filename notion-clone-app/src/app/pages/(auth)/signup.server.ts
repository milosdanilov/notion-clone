import {
  fail,
  json,
  type PageServerAction,
} from '@analogjs/router/server/actions';

import { readFormData } from 'h3';

import { checkEmailExists } from '@notion-clone/supabase';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { SignUpFormSchema } from '@/auth';

export async function action({ event }: PageServerAction) {
  const formData = await readFormData(event);
  const signUpFormData = Object.fromEntries(formData);

  const validatedSignUpFormData = SignUpFormSchema.safeParse(signUpFormData);

  if (!validatedSignUpFormData.success) {
    return fail(400, validatedSignUpFormData.error.flatten().fieldErrors);
  }

  const { email, password } = validatedSignUpFormData.data;

  if (await checkEmailExists(email)) {
    return fail(422, 'User already exists');
  }

  const client = event.context.authClient;

  const { data, error } = await client.register(
    email,
    password,
    `${import.meta.env['VITE_PUBLIC_SITE_URL']}/confirm`,
  );

  if (error) {
    return fail(error.status || 400, error.message);
  }

  return json(data);
}
