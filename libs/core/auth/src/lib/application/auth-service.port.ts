import {
  AuthResponse,
  SessionResponse,
  UserResponse,
  VerifyOtpType,
} from '../types/auth.type';

export interface AuthServicePort {
  authenticate(email: string, password: string): Promise<AuthResponse>;

  register(
    email: string,
    password: string,
    redirectTo: string,
  ): Promise<AuthResponse>;

  confirmEmail(tokenHash: string, type: VerifyOtpType): Promise<AuthResponse>;

  getSession(): Promise<SessionResponse>;
  getUser(): Promise<UserResponse>;
}
