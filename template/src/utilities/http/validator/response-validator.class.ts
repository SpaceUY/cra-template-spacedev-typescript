import { AxiosResponse } from 'axios';
import { ValidationError as ClassValidationError } from 'class-validator';
import { config } from 'config';
import { ValidationError } from 'errors/validation.error';
import { genericErrorHandler } from 'helpers/error.helpers';
import { isArray } from 'helpers/nodash.helpers';
import { BaseDto } from '../base.dto';

export class ResponseValidator<T extends typeof BaseDto = typeof BaseDto> {
  private type: T;

  private validateList: boolean;

  constructor(
    type: T,
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
    return config.validation.validationBreaksResponse;
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
    const validator: BaseDto = new (this.type as any)(payload);

    if (payload) {
      await validator.validateOrFail();
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
