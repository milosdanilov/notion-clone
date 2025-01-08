import { defineEventHandler, getRequestURL, sendRedirect } from 'h3';

import { AuthClient } from '@/auth';

export default defineEventHandler(async (event) => {
  const reqUrl = getRequestURL(event);

  const code = reqUrl.searchParams.get('code');

  if (code) {
    const auth = new AuthClient();
    await auth.getSessionFromCode(code);
  }

  return sendRedirect(event, `${reqUrl.origin}/dashboard`);
});
