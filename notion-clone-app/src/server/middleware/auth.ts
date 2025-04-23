import { defineEventHandler, getRequestURL, sendRedirect } from 'h3';

import { AuthServicePort, SupabaseAuthAdapter } from '@notion-clone/auth';

import { createSupabaseClient } from '@/config';

export default defineEventHandler(async (event) => {
  const authClient: AuthServicePort = new SupabaseAuthAdapter(
    createSupabaseClient(event),
  );

  const { data } = await authClient.getSession();

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
