import { toast } from 'components/Toast/Toast';
import { PublicError } from 'errors/public.error';
import { logger } from 'utilities/logger/Logger';

export function genericErrorHandler(error: unknown): void {
  if (error instanceof PublicError) {
    toast.error(error.message);
  } else if (error instanceof Error) {
    logger.error(error);
  } else {
    console.error(error);
  }
}
