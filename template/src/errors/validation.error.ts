import { ValidationError as ClassValidationError } from 'class-validator';

/**
 * #####       ####
 *   #    ###  #   #  ###
 *   #   #   # #   # #   #
 *   #   #   # #   # #   #
 *   #    ###  ####   ###
 *
 * ToDo: handle handleAsWarning here
 */

export class ValidationError extends Error {
  constructor(
    public details: ClassValidationError[],
    public url: string,
    public handleAsWarning = true,
  ) {
    super(`Validation failed for response.data from ${url}.`);
  }
}
