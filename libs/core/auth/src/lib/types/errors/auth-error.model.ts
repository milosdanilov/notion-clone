export class AuthError extends Error {
  protected __isAuthError = true;

  constructor(
    public message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return (
    typeof error === 'object' && error !== null && '__isAuthError' in error
  );
}
