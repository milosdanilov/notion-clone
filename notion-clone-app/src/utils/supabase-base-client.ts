import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';

import { EventHandlerRequest, H3Event } from 'h3';

export function createSupabaseClientFactory(
  event: H3Event<EventHandlerRequest>,
) {
  const { req, res } = event.node;

  return createServerClient(
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
              serializeCookieHeader(name, value, options),
            );
          });
        },
      },
    },
  );
}

export function createSupabaseBrowserClientFactory() {
  return createBrowserClient(
    import.meta.env['VITE_PUBLIC_SUPABASE_URL'],
    import.meta.env['VITE_PUBLIC_SUPABASE_ANON_KEY'],
  );
}
