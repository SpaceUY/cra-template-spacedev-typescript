import axios, { AxiosError } from 'axios';
import { HttpStatus } from 'enums/http-status.enum';
import { StorageItem } from 'enums/storage-item.enum';
import { HttpError } from 'errors/http.error';
import { PublicError } from 'errors/public.error';
import { reduxStore } from 'global-state';
import { removeAuthTokenAction } from 'global-state/actions';
import { isNumber } from 'helpers/nodash.helpers';
import { storage } from 'helpers/storage.helpers';
import { intl } from 'utilities/i18n/intl.utility';
import { logger } from 'utilities/logger/Logger';
import { getSafeAxiosError } from './http.helpers';

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
    return response.data;
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

export { axiosInstance as http };
