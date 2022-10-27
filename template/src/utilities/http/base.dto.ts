import { validateOrReject } from 'class-validator';

export abstract class BaseDto {
  constructor(data: unknown) {
    // no-op
  }

  public async validateOrFail() {
    await validateOrReject(this);
  }
}
