type DataShapeNullKeys<TData> = { [K in keyof TData]: null };

export type WrappedSuccessResponse<TData> = { data: TData; error: null };
export type WrappedErrorResponse<TData, TError> = {
  data: DataShapeNullKeys<TData>;
  error: TError;
};

export type WrappedResponse<TData, TError> =
  | WrappedSuccessResponse<TData>
  | WrappedErrorResponse<TData, TError>;

export interface WrapResponseFunction<TData> {
  success: (data: TData) => WrappedSuccessResponse<TData>;
  error: <TError>(error: TError) => WrappedErrorResponse<TData, TError>;
}

export const wrapResponse = <TData extends object>(
  dataShape: TData,
): WrapResponseFunction<TData> => {
  return {
    success: (data) => ({
      data,
      error: null,
    }),
    error: (error) => {
      const nullData = Object.keys(dataShape).reduce((props, key) => {
        props[key as keyof TData] = null;
        return props;
      }, {} as DataShapeNullKeys<TData>);

      return {
        data: nullData,
        error,
      };
    },
  };
};
