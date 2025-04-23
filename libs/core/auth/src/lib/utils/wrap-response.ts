export type WrappedSuccessResponse<T> = { data: T; error: null };
export type WrappedErrorResponse<E> = { data: null; error: E };

export type WrappedResponse<T, E> =
  | WrappedSuccessResponse<T>
  | WrappedErrorResponse<E>;

export interface WrapResponseFunction {
  success: {
    <T>(data: T): WrappedSuccessResponse<T>;
  };
  error: {
    <E>(error: E): WrappedErrorResponse<E>;
  };
}

export const wrapResponse: WrapResponseFunction = {
  success: (data) => ({ data, error: null }),
  error: (error) => ({ data: null, error }),
};
