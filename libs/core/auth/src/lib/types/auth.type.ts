import { WrappedResponse } from '../utils/wrap-response';
import { AuthError } from './errors/auth-error.model';
import { Session } from './session.interface';
import { User } from './user.interface';

export type VerifyOtpType = 'email';

export type AuthResponse<TUser = User, TSession = Session> = WrappedResponse<
  { user: TUser; session: TSession },
  AuthError
>;

export type UserResponse<TUser = User> = WrappedResponse<
  { user: TUser },
  AuthError
>;

export type SessionResponse<TSession = Session> = WrappedResponse<
  { session: TSession },
  AuthError
>;
