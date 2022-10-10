import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpStatus } from 'enums/http-status.enum';
import { StorageItem } from 'enums/storage-item.enum';
import { HttpError } from 'errors/http.error';
import { PublicError } from 'errors/public.error';
import { reduxStore } from 'global-state';
import { removeAuthTokenAction } from 'global-state/actions';
import { isNil, isNumber } from 'helpers/nodash.helpers';
import { storage } from 'helpers/storage.helpers';
import { intl } from 'utilities/i18n/intl.utility';
import { logger } from 'utilities/logger/Logger';
import { getSafeAxiosError } from './http.helpers';
import { ResponseValidator } from './validator/response-validator.class';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? '',
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = {
      Accept: 'application/json',
    };

    const authToken = storage.session.get(StorageItem.AUTH_TOKEN);

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    logger.error(new Error(error.message), {
      status: error.code,
      actualError: getSafeAxiosError(error),
    });

    const status: number = error.request?.status;

    if (status === HttpStatus.UNAUTHORIZED) {
      // TODO: redirect to login

      reduxStore.dispatch(removeAuthTokenAction);

      return Promise.reject(
        new PublicError(
          intl.translate({
            id: 'Please login',
          }),
        ),
      );
    }

    if (error.message && isNumber(status)) {
      return Promise.reject(new HttpError(error.message, status));
    }

    return Promise.reject(error);
  },
);

function isResponseValidator(value: unknown): value is ResponseValidator {
  return !isNil(value) && value instanceof ResponseValidator;
}

class Http {
  private http = axiosInstance;

  async get<T = unknown>(
    url: string,
    config?: Parameters<typeof this.http.get>[1],
    validator?: ResponseValidator,
  ): Promise<T>;

  async get<T = unknown>(
    url: string,
    validator?: ResponseValidator,
  ): Promise<T>;

  async get<T = unknown>(
    url: string,
    configOrValidator?: Parameters<typeof this.http.get>[1] | ResponseValidator,
    validator?: ResponseValidator,
  ): Promise<T> {
    const _config = isResponseValidator(configOrValidator)
      ? undefined
      : configOrValidator;

    const response = await this.http.get<T>(url, _config);

    await this.runValidation<typeof this.http.get>(
      response,
      configOrValidator,
      validator,
    );

    return response.data;
  }

  async post<T = unknown>(
    url: string,
    config?: Parameters<typeof this.http.post>[1],
    validator?: ResponseValidator,
  ): Promise<T>;

  async post<T = unknown>(
    url: string,
    validator?: ResponseValidator,
  ): Promise<T>;

  async post<T = unknown>(
    url: string,
    configOrValidator?:
      | Parameters<typeof this.http.post>[1]
      | ResponseValidator,
    validator?: ResponseValidator,
  ): Promise<T> {
    const _config = isResponseValidator(configOrValidator)
      ? undefined
      : configOrValidator;

    const response = await this.http.post<T>(url, _config);

    await this.runValidation<typeof this.http.post>(
      response,
      configOrValidator,
      validator,
    );

    return response.data;
  }

  async put<T = unknown>(
    url: string,
    config?: Parameters<typeof this.http.put>[1],
    validator?: ResponseValidator,
  ): Promise<T>;

  async put<T = unknown>(
    url: string,
    validator?: ResponseValidator,
  ): Promise<T>;

  async put<T = unknown>(
    url: string,
    configOrValidator?: Parameters<typeof this.http.put>[1] | ResponseValidator,
    validator?: ResponseValidator,
  ): Promise<T> {
    const _config = isResponseValidator(configOrValidator)
      ? undefined
      : configOrValidator;

    const response = await this.http.put<T>(url, _config);

    await this.runValidation<typeof this.http.put>(
      response,
      configOrValidator,
      validator,
    );

    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    config?: Parameters<typeof this.http.patch>[1],
    validator?: ResponseValidator,
  ): Promise<T>;

  async patch<T = unknown>(
    url: string,
    validator?: ResponseValidator,
  ): Promise<T>;

  async patch<T = unknown>(
    url: string,
    configOrValidator?:
      | Parameters<typeof this.http.patch>[1]
      | ResponseValidator,
    validator?: ResponseValidator,
  ): Promise<T> {
    const _config = isResponseValidator(configOrValidator)
      ? undefined
      : configOrValidator;

    const response = await this.http.patch<T>(url, _config);

    await this.runValidation<typeof this.http.patch>(
      response,
      configOrValidator,
      validator,
    );

    return response.data;
  }

  async delete<T = unknown>(
    url: string,
    config?: Parameters<typeof this.http.delete>[1],
    validator?: ResponseValidator,
  ): Promise<T>;

  async delete<T = unknown>(
    url: string,
    validator?: ResponseValidator,
  ): Promise<T>;

  async delete<T = unknown>(
    url: string,
    configOrValidator?:
      | Parameters<typeof this.http.delete>[1]
      | ResponseValidator,
    validator?: ResponseValidator,
  ): Promise<T> {
    const _config = isResponseValidator(configOrValidator)
      ? undefined
      : configOrValidator;

    const response = await this.http.delete<T>(url, _config);

    await this.runValidation<typeof this.http.delete>(
      response,
      configOrValidator,
      validator,
    );

    return response.data;
  }

  async options<T = unknown>(
    url: string,
    config?: Parameters<typeof this.http.options>[1],
    validator?: ResponseValidator,
  ): Promise<T>;

  async options<T = unknown>(
    url: string,
    validator?: ResponseValidator,
  ): Promise<T>;

  async options<T = unknown>(
    url: string,
    configOrValidator?:
      | Parameters<typeof this.http.options>[1]
      | ResponseValidator,
    validator?: ResponseValidator,
  ): Promise<T> {
    const _config = isResponseValidator(configOrValidator)
      ? undefined
      : configOrValidator;

    const response = await this.http.options<T>(url, _config);

    await this.runValidation<typeof this.http.options>(
      response,
      configOrValidator,
      validator,
    );

    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async runValidation<Method extends (...args: any) => unknown>(
    response: AxiosResponse<unknown>,
    configOrValidator?: Parameters<Method>[1] | ResponseValidator,
    validator?: ResponseValidator,
  ): Promise<void> {
    const _validator = isResponseValidator(configOrValidator)
      ? configOrValidator
      : validator;

    if (_validator) {
      await _validator.validateResponse(response);
    }
  }
}

const http = new Http();

export { http };
