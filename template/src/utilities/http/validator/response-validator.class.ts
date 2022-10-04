import { AxiosResponse } from 'axios';
import {
  validateOrReject,
  ValidationError as ClassValidationError,
} from 'class-validator';
import { ValidationError } from 'errors/validation.error';
import { isArray } from 'helpers/nodash.helpers';

export class ResponseValidator {
  private type: any;

  private validateList: boolean;

  private errorsAsWarnings = process.env.REACT_APP_VALIDATION_ERROR_AS_WARNING
    ? process.env.REACT_APP_VALIDATION_ERROR_AS_WARNING !== 'false'
    : true;

  constructor(
    type: unknown,
    options?: {
      validateList?: boolean;
    },
  ) {
    this.type = type;
    this.validateList = options?.validateList ?? false;
  }

  public async validateResponseOrFail(response: AxiosResponse): Promise<void> {
    try {
      if (this.validateList) {
        await this._validateList(response.data);
      } else {
        await this._validateItem(response.data);
      }
    } catch (error) {
      throw new ValidationError(
        error as ClassValidationError[],
        response.config?.url ?? '[cannot read url]',
        this.errorsAsWarnings,
      );
    }
  }

  private async _validateItem(payload?: unknown): Promise<void> {
    const validator = new this.type();

    const keys = Object.keys(validator);

    if (payload) {
      keys.forEach((key) => {
        validator[key] = (payload as any)[key];
      });

      return validateOrReject(validator);
    }
  }

  private async _validateList(payload: unknown): Promise<void> {
    if (isArray(payload)) {
      await Promise.all(
        payload.map((_payload) => this._validateItem(_payload)),
      );
    } else {
      return this._validateItem(payload);
    }
  }
}
