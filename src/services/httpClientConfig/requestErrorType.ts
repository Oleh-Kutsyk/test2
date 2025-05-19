import { AxiosError, AxiosRequestConfig } from 'axios';

export const responseStatusCodes = {
  400: 400,
  401: 401,
  403: 403,
  422: 422,
  500: 500,
} as const;

export enum EErrorStatuses {
  NotFound = 'NotFound',
  BadRequest = 'BadRequest',
  NotAuthorized = 'NotAuthorized',
  Unauthenticated = 'Unauthenticated',
  InternalError = 'InternalError',
  AlreadyExists = 'AlreadyExists',
  InvalidArgument = 'InvalidArgument',
  InvalidResponse = 'InvalidResponse',
  PermissionDenied = 'PermissionDenied',
  Unimplemented = 'Unimplemented',
  Unavailable = 'Unavailable',
  TradingUnauthenticated = 'TradingUnauthenticated',
  TechnicalWorks = 'TechnicalWorks',
  Cancelled = 'Cancelled',
  SessionExpired = 'SessionExpired',
}

export interface IHttpClientResponseError extends Omit<AxiosError, 'response'> {
  response: {
    config: AxiosRequestConfig;
    data?: {
      requestId: string;
      errorMessage: string;
      errorStatus: EErrorStatuses;
      validationErrors: { field: string; message: string }[];
    };
    status: keyof typeof responseStatusCodes;
  };
}
