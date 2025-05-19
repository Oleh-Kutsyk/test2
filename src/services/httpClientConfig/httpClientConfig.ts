import { THttpClientInternalRequestConfig, httpClient } from './httpClient';
import { refreshTokenWithReSendLastRequest } from './refreshToken';
import { EErrorStatuses, IHttpClientResponseError } from './requestErrorType';

const STATUS_CODE = {
  401: 401,
  403: 403,
  422: 422,
  500: 500,
};

interface IGetAuthRefreshTokenBE {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  tokenType: string;
}

const REQUEST_TIMEOUT = 10000; // 10s;

interface IConfig {
  getAccessToken: () => string | void;
  refreshToken: () => Promise<IGetAuthRefreshTokenBE | undefined> | void;
  getTokenType: () => string | void;
  logout: () => void;
}

const initFunc = () => {};

export class HttpClientConfig {
  constructor() {
    this._getAccessToken = initFunc;
    this._refreshToken = initFunc;
    this._getTokenType = initFunc;
    this._logout = initFunc;
  }

  private _getAccessToken: IConfig['getAccessToken'];
  private _refreshToken: IConfig['refreshToken'];
  private _logout: IConfig['logout'];
  private _getTokenType: IConfig['getTokenType'];

  initialize(config: IConfig): void {
    this._refreshToken = config.refreshToken;
    this._getAccessToken = config.getAccessToken;
    this._logout = config.logout;
    this._getTokenType = config.getTokenType;
    this._setDefaults();
    this._setRequestInterceptors();
    this._setResponseInterceptors();
  }

  private get _authHeader() {
    const token = this._getAccessToken();
    const tokenType = this._getTokenType();
    return token ? `${tokenType} ${token}` : '';
  }

  private _setDefaults() {
    httpClient.defaults = {
      timeout: REQUEST_TIMEOUT,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  private _setRequestInterceptors() {
    httpClient.interceptors.request.use(
      (config: THttpClientInternalRequestConfig): THttpClientInternalRequestConfig => {
        if (this._authHeader) {
          config.headers.Authorization = this._authHeader;
        }
        return config;
      },
      (error: Error): Error => {
        console.error('error', error);
        throw error;
      },
    );
  }

  private _setResponseInterceptors() {
    httpClient.interceptors.response.use(
      (response) => {
        return {
          ...response,
          data: response.data.data || response.data,
        };
      },
      (e) => {
        const error = e as unknown as IHttpClientResponseError;
        const response = error.response;

        if (error.code === 'ERR_CANCELED') {
          throw error;
        }

        if (!response?.status) {
          return;
        }

        const errorStatus = response.data?.errorStatus;

        if (response.status === STATUS_CODE[401] || response.status === STATUS_CODE[403]) {
          if (errorStatus === EErrorStatuses.SessionExpired) {
            this._logout();
            return;
          }

          const refresh = this._refreshToken as () => Promise<IGetAuthRefreshTokenBE | undefined>;
          return refreshTokenWithReSendLastRequest(response.config, refresh, this._logout);
        }
        throw error;
      },
    );
  }
}

export const httpClientConfig = new HttpClientConfig();
