import { ValidationError as ClassValidationError } from 'class-validator';

export class ValidationError extends Error {
  constructor(
    public details: ClassValidationError[],
    public url: string,
    public handleAsWarning = false,
  ) {
    super(`Validation failed for response.data from ${url}.`);
  }
}
