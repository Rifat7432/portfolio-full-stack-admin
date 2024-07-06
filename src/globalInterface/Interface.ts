export type TErrorData = {
    data: {
      success: boolean;
      message: string;
      errorDetails: any;
      stack: null;
    };
  };
  export type TResponse<T> = {
    data: {
      data?: T;
      success: boolean;
      message: string;
    };
    error?: TErrorData;
  };