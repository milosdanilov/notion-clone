import { type ServerContext } from '@analogjs/router/tokens';

import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';

import { SupabaseClient } from '@supabase/supabase-js';

import { BaseSupabaseClient } from '../impl/supabase-client';

export class AuthServerClient extends BaseSupabaseClient {
  constructor(private context: ServerContext) {
    super();
    this.client = this.createAuthClient();
  }

  override createAuthClient(): SupabaseClient {
    const context = this.context;

    return createServerClient(
      import.meta.env['VITE_PUBLIC_SUPABASE_URL'],
      import.meta.env['VITE_PUBLIC_SUPABASE_ANON_KEY'],
      {
        cookies: {
          getAll() {
            return parseCookieHeader(context.req.headers.cookie ?? '');
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              context.res.appendHeader(
                'Set-Cookie',
                serializeCookieHeader(name, value, options)
              );
            });
          },
        },
      }
    );
  }
}
