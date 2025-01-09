import { ServerContext } from '@analogjs/router/tokens';

import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';

import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type EmailOtpType,
  SupabaseClient,
} from '@supabase/supabase-js';

export class AuthServerClient {
  private supabaseClient!: SupabaseClient;

  constructor(context: ServerContext) {
    this.supabaseClient = createServerClient(
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

  login(email: string, password: string): Promise<AuthTokenResponsePassword> {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }

  signUp(email: string, password: string): Promise<AuthResponse> {
    return this.supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${import.meta.env['VITE_PUBLIC_SITE_URL']}/dashboard`,
      },
    });
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const { data } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', email);

    return !!data?.length;
  }

  confirmEmail(tokenHash: string, type: EmailOtpType): Promise<AuthResponse> {
    return this.supabaseClient.auth.verifyOtp({ token_hash: tokenHash, type });
  }

  getSession() {
    return this.supabaseClient.auth.getSession();
  }
}
