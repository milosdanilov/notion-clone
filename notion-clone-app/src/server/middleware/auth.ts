import { defineEventHandler, getRequestURL, sendRedirect } from 'h3';

import { createAuthClient } from '@/utils';

export default defineEventHandler(async (event) => {
  const client = createAuthClient(event);
  const { data } = await client.getSession();

  const req = getRequestURL(event);

  if (req.pathname.startsWith('/dashboard')) {
    if (!data.session) {
      return sendRedirect(event, '/login');
    }
  }

  if (['/login', '/signup'].includes(req.pathname)) {
    if (data.session) {
      return sendRedirect(event, '/dashboard');
    }
  }
});
