import { toast } from 'components/Toast/Toast';
import { PublicError } from 'errors/public.error';
import { ValidationError } from 'errors/validation.error';
import { logger } from 'utilities/logger/Logger';

export function genericErrorHandler(error: unknown): void {
  if (error instanceof PublicError) {
    toast.error(error.message);
  } else if (error instanceof ValidationError) {
    if (error.handleAsWarning) {
      logger.warn(error.message, { ...error });
    } else {
      logger.error(error, { ...error });
    }
  } else if (error instanceof Error) {
    logger.error(error);
  } else {
    console.error(error);
  }
}
