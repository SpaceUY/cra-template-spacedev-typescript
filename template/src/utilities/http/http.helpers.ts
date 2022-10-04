import { AxiosError } from 'axios';
import { ResponseValidator } from 'utilities/http/validator/response-validator.class';

type SafeAxiosError = {
  code?: string;
  request?: {
    responseURL?: string;
    statusText?: string;
    status?: number;
  };
  response?: {
    statusText?: string;
    status?: number;
  };
  status?: string;
  message?: string;
};

export function getSafeAxiosError(axiosError: AxiosError): SafeAxiosError {
  const { code, message } = axiosError;

  const safeError: SafeAxiosError = { code, message };

  safeError.request = {
    responseURL: axiosError.request.responseURL,
    statusText: axiosError.request.statusText,
    status: axiosError.request.status,
  };

  if (axiosError.response) {
    safeError.response = {
      statusText: axiosError.response.statusText,
      status: axiosError.response.status,
    };
  }

  return safeError;
}

export function isResponseValidator(
  validator: unknown,
): validator is ResponseValidator {
  return !!validator && validator instanceof ResponseValidator;
}
