import { defineEventHandler, getRequestURL, sendRedirect } from 'h3';

import { AuthClient } from '@/auth';

export default defineEventHandler(async (event) => {
  const client = new AuthClient();
  const { data } = await client.getSession();

  const req = getRequestURL(event);

  console.log('middleware, ', req.href);

  if (req.pathname.startsWith('/dashboard')) {
    if (!data.session) {
      return sendRedirect(event, '/login');
    }
  }

  const emailLinkError = 'Email link is invalid or has expired';

  const reqErrorDescription = req.searchParams.get('error_description');

  if (reqErrorDescription === emailLinkError && req.pathname !== '/signup') {
    return sendRedirect(
      event,
      `/signup?error_description=${reqErrorDescription}`
    );
  }

  if (['/login', '/signup'].includes(req.pathname)) {
    if (data.session) {
      return sendRedirect(event, '/dashboard');
    }
  }
});
