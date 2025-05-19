import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
  CancelTokenStatic,
  InternalAxiosRequestConfig,
} from 'axios';

export type THttpClientInstance = AxiosInstance;
export type THttpClientResponse<T> = AxiosResponse<T>;

export type THttpClientRequestConfig = AxiosRequestConfig;
export type THttpClientInternalRequestConfig = InternalAxiosRequestConfig;

// THttpResponse is util type for reduce manually wright Promise<T>
export type THttpResponse<T> = Promise<THttpClientResponse<T>>;

export type TBEResponse<T> = { result: T; message: string };

export const httpClient: THttpClientInstance = Axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const isHttpClientCancel = Axios.isCancel;
export const isHttpClientError = Axios.isAxiosError;

export const httpClientCancelTokenStatic = Axios.CancelToken;
export type THttpClientCancelTokenStatic = CancelTokenStatic;
export type THttpClientCancelToken = CancelToken;

export type TAsyncActionOptions = {
  cancelToken: {
    cancelToken?: THttpClientCancelToken;
  };
};
