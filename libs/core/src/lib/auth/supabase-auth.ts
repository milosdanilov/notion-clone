import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type EmailOtpType,
  SupabaseClient,
  type UserResponse,
} from '@supabase/supabase-js';

export class SupabaseAuthClient {
  constructor(private client: SupabaseClient) {}

  login(email: string, password: string): Promise<AuthTokenResponsePassword> {
    return this.client.auth.signInWithPassword({ email, password });
  }

  signUp(
    email: string,
    password: string,
    redirectTo: string
  ): Promise<AuthResponse> {
    return this.client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const { data } = await this.client
      .from('users')
      .select('*')
      .eq('email', email);

    return !!data?.length;
  }

  confirmEmail(tokenHash: string, type: EmailOtpType): Promise<AuthResponse> {
    return this.client.auth.verifyOtp({ token_hash: tokenHash, type });
  }

  getSession() {
    return this.client.auth.getSession();
  }

  getUser(): Promise<UserResponse> {
    return this.client.auth.getUser();
  }
}
