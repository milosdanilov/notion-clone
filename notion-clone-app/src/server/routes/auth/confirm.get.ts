import { EmailOtpType } from '@supabase/supabase-js';

import { defineEventHandler, getRequestURL, sendRedirect } from 'h3';

import { createAuthClient } from '@/utils';

export default defineEventHandler(async (event) => {
  const reqUrl = getRequestURL(event);

  const tokenHash = reqUrl.searchParams.get('token_hash');
  const type = reqUrl.searchParams.get('type') as EmailOtpType;
  const next = reqUrl.searchParams.get('next') ?? '/';

  if (!tokenHash || !type) {
    return sendRedirect(event, '/signup');
  }

  const client = createAuthClient(event);
  const { error } = await client.confirmEmail(tokenHash, type);

  if (!error) {
    return sendRedirect(event, next);
  }

  return sendRedirect(
    event,
    `/signup?error_code=${error.code}&error_message=${error.message}`
  );
});
