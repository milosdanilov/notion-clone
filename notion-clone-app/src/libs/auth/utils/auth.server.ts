import {
  AuthTokenResponsePassword,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';

export class AuthClient {
  private supabaseClient!: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      import.meta.env['NEXT_PUBLIC_SUPABASE_URL'],
      import.meta.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
    );
  }

  login(email: string, password: string): Promise<AuthTokenResponsePassword> {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }
}
