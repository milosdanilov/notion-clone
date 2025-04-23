import {
  Session as SupabaseSession,
  User as SupabaseUser,
  UserResponse as SupabaseUserResponse,
  AuthResponse as SupabaseAuthResponse,
} from '@supabase/supabase-js';

import { User } from '../../types/user.interface';
import { Session } from '../../types/session.interface';
import { AuthError } from '../../types/errors/auth-error.model';
import {
  AuthResponse,
  SessionResponse,
  UserResponse,
} from '../../types/auth.type';
import { wrapResponse } from '../../utils/wrap-response';

type SupabaseSessionResponse = {
  data: {
    session: SupabaseSession | null;
  };
  error: { message: string; status?: number; code?: string } | null;
};

export function mapUserFromSupabase(user: SupabaseUser): User {
  return {
    id: user.id,
    email: user.email,
  };
}

export function mapSessionFromSupabase(session: SupabaseSession): Session {
  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in,
    expires_at: session.expires_at,
    token_type: session.token_type,
  };
}

export function toUserReponse({
  data,
  error,
}: SupabaseUserResponse): UserResponse {
  const response = wrapResponse({ user: null as unknown as User });

  if (error) {
    return response.error(
      new AuthError(error.message, error.status, error.code),
    );
  }

  return response.success({
    user: mapUserFromSupabase(data.user),
  });
}

export function toSessionResponse({
  data,
  error,
}: SupabaseSessionResponse): SessionResponse {
  const response = wrapResponse({ session: null as unknown as Session });
  if (error) {
    return response.error(
      new AuthError(error.message, error.status, error.code),
    );
  }

  if (!data.session) {
    return response.error(new AuthError('Session is empty'));
  }

  return response.success({
    session: mapSessionFromSupabase(data.session),
  });
}

export function toAuthResponse({
  data,
  error,
}: SupabaseAuthResponse): AuthResponse {
  const response = wrapResponse({
    session: null as unknown as Session,
    user: null as unknown as User,
  });

  if (error) {
    return response.error(
      new AuthError(error.message, error.status, error.code),
    );
  }

  if (!data.session || !data.user) {
    return response.error(new AuthError('User or Session is empty'));
  }

  return response.success({
    user: mapUserFromSupabase(data.user),
    session: mapSessionFromSupabase(data.session),
  });
}
