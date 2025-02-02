import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';

import { EventHandlerRequest, H3Event } from 'h3';

import { SupabaseAuthClient } from '@notion-clone/core';

export const createAuthClient = (event: H3Event<EventHandlerRequest>) => {
  const { req, res } = event.node;

  return new SupabaseAuthClient(
    createServerClient(
      import.meta.env['VITE_PUBLIC_SUPABASE_URL'],
      import.meta.env['VITE_PUBLIC_SUPABASE_ANON_KEY'],
      {
        cookies: {
          getAll() {
            return parseCookieHeader(req.headers.cookie ?? '');
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.appendHeader(
                'Set-Cookie',
                serializeCookieHeader(name, value, options)
              );
            });
          },
        },
      }
    )
  );
};
