import {
  type AuthResponse,
  AuthTokenResponse,
  type AuthTokenResponsePassword,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';

export class AuthClient {
  private supabaseClient!: SupabaseClient;

  constructor() {
    // TODO: use @supabase/ssr instead for cookie based auth
    this.supabaseClient = createClient(
      import.meta.env['VITE_PUBLIC_SUPABASE_URL'],
      import.meta.env['VITE_PUBLIC_SUPABASE_ANON_KEY']
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
        // NEXT_PUBLIC_SITE_URL
        emailRedirectTo: 'http://localhost:4200/api/auth/callback',
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

  getSessionFromCode(code: string): Promise<AuthTokenResponse> {
    return this.supabaseClient.auth.exchangeCodeForSession(code);
  }

  getSession() {
    return this.supabaseClient.auth.getSession();
  }
}
