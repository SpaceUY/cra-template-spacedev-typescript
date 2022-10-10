import { AxiosResponse } from 'axios';
import {
  validateOrReject,
  ValidationError as ClassValidationError,
} from 'class-validator';
import { ValidationError } from 'errors/validation.error';
import { genericErrorHandler } from 'helpers/error.helpers';
import { isArray } from 'helpers/nodash.helpers';
import { BaseDto } from '../base.dto';

export class ResponseValidator {
  private type: BaseDto;

  private validateList: boolean;

  private validationBreaksResponse = process.env
    .REACT_APP_VALIDATION_ERROR_BREAKS_RESPONSE
    ? process.env.REACT_APP_VALIDATION_ERROR_BREAKS_RESPONSE !== 'true'
    : false;

  constructor(
    type: BaseDto,
    options?: {
      validateList?: boolean;
    },
  ) {
    this.type = type;
    this.validateList = options?.validateList ?? false;
  }

  public async validateResponse(response: AxiosResponse): Promise<void> {
    try {
      await this._validateOrFail(response.data);
    } catch (error) {
      const validationError = new ValidationError(
        error as ClassValidationError[],
        response.config?.url ?? '[cannot read url]',
        !this.shouldThrow,
      );

      if (this.shouldThrow) {
        throw validationError;
      } else {
        genericErrorHandler(validationError);
      }
    }
  }

  public get shouldThrow(): boolean {
    return this.validationBreaksResponse;
  }

  private async _validateOrFail(data: unknown): Promise<void> {
    if (this.validateList) {
      return this._validateList(data);
    } else {
      return this._validateItem(data);
    }
  }

  private async _validateItem(payload?: unknown): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validator = new (this.type as any)(payload);

    if (payload) {
      await validateOrReject(validator);
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
