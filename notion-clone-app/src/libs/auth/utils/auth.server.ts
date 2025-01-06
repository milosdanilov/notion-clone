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
      import.meta.env['NEXT_PUBLIC_SUPABASE_URL'],
      import.meta.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
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

    console.log(data);

    return !!data?.length;
  }
}
