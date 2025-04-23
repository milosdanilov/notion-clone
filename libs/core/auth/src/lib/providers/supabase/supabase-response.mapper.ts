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

type SupabaseSessionResponse =
  | {
      data: {
        session: SupabaseSession;
      };
      error: null;
    }
  | {
      data: {
        session: null;
      };
      error: { message: string; status: number; code: string };
    }
  | {
      data: {
        session: null;
      };
      error: null;
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
  if (error) {
    return wrapResponse.error(
      new AuthError(error.message, error.status, error.code),
    );
  }

  return wrapResponse.success({
    user: mapUserFromSupabase(data.user),
  });
}

export function toSessionResponse({
  data,
  error,
}: SupabaseSessionResponse): SessionResponse {
  if (error) {
    return wrapResponse.error(
      new AuthError(error.message, error.status, error.code),
    );
  }

  return wrapResponse.success({
    session: mapSessionFromSupabase(data.session),
  });
}

export function toAuthResponse({
  data,
  error,
}: SupabaseAuthResponse): AuthResponse {
  if (error) {
    return wrapResponse.error(
      new AuthError(error.message, error.status, error.code),
    );
  }

  return wrapResponse.success({
    user: mapUserFromSupabase(data.user),
    session: mapSessionFromSupabase(data.session),
  });
}
