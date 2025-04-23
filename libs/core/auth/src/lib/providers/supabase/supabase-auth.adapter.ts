import { SupabaseClient } from '@supabase/supabase-js';

import { AuthServicePort } from '../../application/auth-service.port';

import {
  AuthResponse,
  VerifyOtpType,
  SessionResponse,
  UserResponse,
} from '../../types/auth.type';

import {
  toAuthResponse,
  toSessionResponse,
  toUserReponse,
} from './supabase-response.mapper';

export class SupabaseAuthAdapter implements AuthServicePort {
  constructor(protected supabase: SupabaseClient) {}

  async authenticate(email: string, password: string): Promise<AuthResponse> {
    const response = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    return toAuthResponse(response);
  }

  async register(
    email: string,
    password: string,
    redirectTo: string,
  ): Promise<AuthResponse> {
    const response = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    return toAuthResponse(response);
  }

  async confirmEmail(
    tokenHash: string,
    type: VerifyOtpType,
  ): Promise<AuthResponse> {
    const response = await this.supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    return toAuthResponse(response);
  }

  async getSession(): Promise<SessionResponse> {
    const response = await this.supabase.auth.getSession();
    return toSessionResponse(response);
  }

  async getUser(): Promise<UserResponse> {
    const response = await this.supabase.auth.getUser();
    return toUserReponse(response);
  }
}
